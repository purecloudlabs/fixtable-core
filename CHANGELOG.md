# Changelog

## Version History

### 2.0

* Refactored CoffeeScript source to use a modular, object-oriented approach. This dramatically improves code readability and hopefully will greatly simplify maintenance going forward.
* Added automated tests, which must pass before changes may be committed. As of now, test coverage is sparse. One of the main priorities for v2.1 is to expand test suite to cover all functionality and specifically test all previously discovered edge cases.
* Fixed multiple cases that would result in header labels overflowing their parent header cell.
* Fixed case where some header labels are taller than others (due to being multi-line, for instance). All header labels now match height of the tallest one, so copied styles will behave as expected (particularly border styles).
* Fixed case where some filters are taller than others (due to being multi-line, for instance). All filters now match height of the tallest one, so copied styles will behave as expected (particularly border styles).
* Fixed case where a column set too narrow for its header label would cause all preferred column widths to be ignored.
* Fixed case where header would get "stuck" at height required to accommodate multi-line labels, even after window was resized and labels became shorter.
