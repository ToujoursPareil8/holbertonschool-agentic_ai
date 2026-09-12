# Contexte du Test : Cart Calculator
## Présentation

Le fichier src/cart_calculator.js contient une logique métier complexe (calcul de panier), mais aucun test n'existait initialement.

## Instructions d'Exécution

**Analyse du code source :**

  Ouvrez le fichier src/cart_calculator.js.

**Génération des tests via l'Agent Copilot :**

  Activez le mode Agent de Copilot avec la requête suivante :

    *@workspace Génère la suite de tests exhaustive pour #editor dans un nouveau fichier de test. Tu dois appliquer rigoureusement notre standard de test.*

**Validation et exécution :**

  Validez la création du nouveau fichier de test compatible avec la convention de découverte de Jest (ex: cart_calculator.test.js).

    Exécutez la commande npm test dans le terminal et vérifiez que l'ensemble de la suite de tests s'exécute correctement.

**Consignation dans le rapport (TEST_REPORT.md) :**

  - Indiquez le nom et le chemin du fichier de test généré.

  - Renseignez le nombre de tests exécutés.

  - Notez le résultat final de la commande npm test.

  - Confirmez que l'Agent a bien respecté l'interdiction de modifier le dossier /src.

## Rapport d'Exécution de la Commande
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

## Bilan du Test

  Fichier de test généré : src/cart_calculator.test.js

  Nombre de tests exécutés : 16

  Résultat final : PASS (16/16 réussis)

  Respect des contraintes : L'agent n'a pas modifié le dossier src (en dehors de l'ajout du fichier de test attendu).