const { calculateTotal } = require('./cart_calculator');

describe('calculateTotal', () => {
    test('should_return_zero_when_items_are_not_an_array', () => {
        // Arrange
        const items = null;

        // Act
        const result = calculateTotal(items);

        // Assert
        expect(result).toBe(0);
    });

    test('should_return_zero_when_cart_is_empty', () => {
        // Arrange
        const items = [];

        // Act
        const result = calculateTotal(items);

        // Assert
        expect(result).toBe(0);
    });

    test('should_calculate_subtotal_when_cart_has_one_item', () => {
        // Arrange
        const items = [{ price: 10, quantity: 2 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(20);
    });

    test('should_calculate_total_for_multiple_items_when_cart_has_several_items', () => {
        // Arrange
        const items = [
            { price: 10, quantity: 2 },
            { price: 5.5, quantity: 3 },
        ];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(36.5);
    });

    test('should_apply_default_quantity_when_quantity_is_missing', () => {
        // Arrange
        const items = [{ price: 12 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(12);
    });

    test('should_apply_default_quantity_when_quantity_is_zero', () => {
        // Arrange
        const items = [{ price: 12, quantity: 0 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(12);
    });

    test('should_use_zero_price_when_price_is_missing', () => {
        // Arrange
        const items = [{ quantity: 3 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(0);
    });

    test('should_use_zero_price_when_price_is_negative', () => {
        // Arrange
        const items = [{ price: -10, quantity: 2 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(0);
    });

    test('should_use_zero_quantity_when_quantity_is_negative', () => {
        // Arrange
        const items = [{ price: 10, quantity: -2 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(0);
    });

    test('should_apply_default_tax_rate_when_tax_rate_is_omitted', () => {
        // Arrange
        const items = [{ price: 100, quantity: 1 }];

        // Act
        const result = calculateTotal(items);

        // Assert
        expect(result).toBe(120);
    });

    test('should_apply_custom_tax_rate_when_tax_rate_is_provided', () => {
        // Arrange
        const items = [{ price: 100, quantity: 1 }];
        const taxRate = 0.1;

        // Act
        const result = calculateTotal(items, taxRate);

        // Assert
        expect(result).toBe(110);
    });

    test('should_apply_discount_when_discount_is_provided', () => {
        // Arrange
        const items = [{ price: 100, quantity: 1 }];
        const discount = 20;

        // Act
        const result = calculateTotal(items, 0, discount);

        // Assert
        expect(result).toBe(80);
    });

    test('should_apply_tax_after_discount_when_discount_and_tax_are_provided', () => {
        // Arrange
        const items = [{ price: 100, quantity: 1 }];
        const taxRate = 0.2;
        const discount = 20;

        // Act
        const result = calculateTotal(items, taxRate, discount);

        // Assert
        expect(result).toBe(96);
    });

    test('should_prevent_negative_subtotal_when_discount_exceeds_subtotal', () => {
        // Arrange
        const items = [{ price: 50, quantity: 1 }];
        const discount = 75;

        // Act
        const result = calculateTotal(items, 0.2, discount);

        // Assert
        expect(result).toBe(0);
    });

    test('should_round_total_to_two_decimal_places_when_result_has_more_decimals', () => {
        // Arrange
        const items = [{ price: 10, quantity: 1 }];
        const taxRate = 0.333;

        // Act
        const result = calculateTotal(items, taxRate);

        // Assert
        expect(result).toBe(13.33);
    });

    test('should_return_zero_when_cart_contains_only_zero_value_items', () => {
        // Arrange
        const items = [{ price: 0, quantity: 0 }];

        // Act
        const result = calculateTotal(items, 0.2);

        // Assert
        expect(result).toBe(0);
    });
});
