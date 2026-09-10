fichier src/cart_calculator.test.js

16 tests passés

```bash
$ npm test

> agentic-ops-tp3@1.0.0 test
> jest

 PASS  src/cart_calculator.test.js
  calculateTotal
    √ should_return_zero_when_items_are_not_an_array (2 ms)
    √ should_return_zero_when_cart_is_empty (1 ms)
    √ should_calculate_subtotal_when_cart_has_one_item (1 ms)
    √ should_calculate_total_for_multiple_items_when_cart_has_several_items
    √ should_apply_default_quantity_when_quantity_is_missing
    √ should_apply_default_quantity_when_quantity_is_zero
    √ should_use_zero_price_when_price_is_missing (1 ms)
    √ should_use_zero_price_when_price_is_negative
    √ should_use_zero_quantity_when_quantity_is_negative
    √ should_apply_default_tax_rate_when_tax_rate_is_omitted
    √ should_apply_custom_tax_rate_when_tax_rate_is_provided (1 ms)
    √ should_apply_discount_when_discount_is_provided (1 ms)
    √ should_apply_tax_after_discount_when_discount_and_tax_are_provided
    √ should_prevent_negative_subtotal_when_discount_exceeds_subtotal
    √ should_round_total_to_two_decimal_places_when_result_has_more_decimals (1 ms)
    √ should_return_zero_when_cart_contains_only_zero_value_items

Test Suites: 1 passed, 1 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        0.485 s, estimated 6 s
Ran all test suites.
```

l'agent n'a pas modifier le dossier src
