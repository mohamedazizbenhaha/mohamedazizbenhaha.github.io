"""Unit tests for check_facts.py: python scripts/test_check_facts.py"""

import pathlib
import subprocess
import sys
import tempfile
import unittest

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import check_facts as cf  # noqa: E402

SRC = "Certified trainer: 500+ hours. PhD 2024. Rate 3.5 of 5. 1,000 users. Tel +216 25 713 413."


class T(unittest.TestCase):
    def bad(self, out, allow=frozenset()):
        return [n for _, n in cf.check(SRC, {"o": out}, set(allow))]

    def test_backed_numbers_pass(self):
        self.assertEqual(self.bad("500 hours since 2024, rated 3.5, 1000 users"), [])

    def test_thousands_and_decimal_comma_normalised(self):
        self.assertEqual(self.bad("1 000 users, 1,000 users, 3,5"), [])

    def test_invented_number_fails(self):
        self.assertEqual(self.bad("900+ hours"), ["900"])

    def test_html_ignores_markup_and_scripts(self):
        raw = '<div class="w-700" data-x="123"><script>var a=999</script><p>500+ h</p></div>'
        self.assertEqual(self.bad(cf.visible_text(raw, ".html")), [])

    def test_allowlist(self):
        self.assertEqual(self.bad("104", allow={"104"}), [])

    def test_mutation_output_number_changed(self):
        good = "Over 500 hours in 2024"
        self.assertEqual(self.bad(good), [])
        self.assertEqual(self.bad(good.replace("500", "501")), ["501"])
        self.assertEqual(self.bad(good.replace("2024", "2042")), ["2042"])

    def test_mutation_source_number_removed(self):
        out = "Over 500 hours"
        self.assertEqual(cf.check(SRC, {"o": out}, set()), [])
        self.assertEqual(cf.check(SRC.replace("500+", "five hundred"), {"o": out}, set()), [("o", "500")])

    def test_cli_exit_codes(self):
        script = str(pathlib.Path(cf.__file__))
        with tempfile.TemporaryDirectory() as d:
            d = pathlib.Path(d)
            (d / "s.md").write_text(SRC, encoding="utf-8")
            (d / "ok.txt").write_text("500 hours", encoding="utf-8")
            (d / "bad.txt").write_text("501 hours", encoding="utf-8")
            run = lambda f: subprocess.run([sys.executable, script, "--source", str(d / "s.md"), "--allow", str(d / "none"), str(d / f)], capture_output=True).returncode
            self.assertEqual(run("ok.txt"), 0)
            self.assertEqual(run("bad.txt"), 1)

    def test_real_content_md_unchanged_guard(self):
        # the live page must be backed by content.md + the documented allowlist
        self.assertEqual(subprocess.run([sys.executable, cf.__file__]).returncode, 0)


if __name__ == "__main__":
    unittest.main()
