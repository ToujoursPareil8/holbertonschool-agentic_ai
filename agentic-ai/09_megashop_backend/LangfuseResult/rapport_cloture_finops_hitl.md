# Rapport de clôture — Revue FinOps & Garde-fou HITL

**Projet :** `megashop-payment-webhook` — Worker de traitement des paiements
**Date des tests :** 19 septembre 2026
**Source des données :** export Langfuse (`lf-events-export-*.json`), dashboard Langfuse (capture jointe)

---

## 1. Consultation du tableau de bord Langfuse

Le tableau de bord du projet a été consulté (`cloud.langfuse.com`), confirmant :

- **7 traces** enregistrées sous `megashop.payment.processing` (version corrigée du Worker) et `megashop.payment.analysis` (traces résiduelles d'une version antérieure du code, avant correctif du rattachement de trace)
- **4 scores** `human-refund-approval` enregistrés
- Un coût agrégé affiché à **$0.00** dans le résumé du dashboard — ce montant est arrondi à 2 décimales ; le détail exact est calculé ci-dessous à partir de l'export brut.

*(Capture du dashboard jointe séparément au livrable.)*

## 2. Coût des appels LLM exécutés pendant les tests

D'après l'export Langfuse (`totalCost` par génération), sur l'ensemble des paiements traités :

| Trace | Modèle | Tokens (in/out/total) | Coût |
|---|---|---|---|
| `payment-test-002` | `gemini-3.6-flash` | 48 / 343 / 953 | $0.00132225 |
| `payment-test-refund-002` | `gemini-3.6-flash` | 49 / 275 / 846 | $0.00106800 |
| `payment-test-001`, `payment-test-refund-001`, traces `megashop.payment.analysis` (×2) | `gemini-3.6` *(nom de modèle invalide, appel en échec 404)* | — | $0.00 |

**Coût total mesuré sur la session de tests : $0.00239025**

Les appels en échec ($0.00) correspondent aux tout premiers tests, réalisés avant la correction du nom de modèle (`gemini-3.6` → `gemini-3.6-flash`) ; aucun token n'a été consommé côté fournisseur pour ces appels, cohérent avec l'absence de coût.

## 3. Traces et scores — appels LLM et décisions HITL

Chaque décision humaine de validation ou de refus de remboursement est rattachée, via son `traceId`, à la trace du traitement du paiement concerné — garantissant qu'on peut retrouver, pour chaque commande, à la fois l'appel LLM éventuel et la décision HITL associée.

| `traceId` | Décision HITL | Appel LLM déclenché ? | Coût | Constat |
|---|---|---|---|---|
| `payment-test-refund-002` | ✅ Approuvé (`1`) | Oui | $0.001068 | Traitement autorisé → analyse exécutée normalement |
| `payment-test-refund-001` | ✅ Approuvé (`1`) | Oui *(échec 404)* | $0 | Autorisé, mais appel LLM en échec (ancien nom de modèle) |
| `payment-test-refund-003` | ⛔ Refusé (`0`) | **Non** | $0 | Refus opérateur → traitement annulé avant tout appel LLM |
| `payment-qa-payment` | ⛔ Refusé (`0`) | **Non** | $0 | Refus opérateur → traitement annulé avant tout appel LLM |
| `payment-test-002` | — *(pas un remboursement)* | Oui | $0.00132225 | Paiement standard, pas de garde-fou HITL nécessaire |
| `payment-test-001` | — *(pas un remboursement)* | Oui *(échec 404)* | $0 | Paiement standard, appel LLM en échec (ancien nom de modèle) |

**Fichier source complet :** `lf-events-export-cmu2ltfw803ssad0f8kvk80eh.json` (13 événements, export non paginé/non tronqué)

## 4. Constats clés

- **Le garde-fou HITL fonctionne comme spécifié** : sur les 4 décisions tracées, 2 refus ont bien empêché tout appel LLM (donc tout coût), et 2 approbations ont bien laissé le traitement se poursuivre.
- **Chaque score est rattaché à la trace du traitement concerné**, et non à une trace isolée — condition explicitement demandée dans le cahier des charges.
- **Un refus opérateur a un coût LLM nul**, ce qui démontre que le Pre-Hook agit bien *avant* toute dépense, pas après.
- Le coût mesuré sur cette session de tests reste marginal (< $0.003), cohérent avec un volume de test réduit (6 commandes traitées).

## 5. Verdict

**GO** — Le mécanisme HITL et son instrumentation Langfuse (coût + score, rattachés à la bonne trace) répondent à la consigne de clôture FinOps. Aucune action corrective requise sur ce périmètre.

---
