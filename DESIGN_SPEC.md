# Sleek Auto Sales Inc. — Inspection & High-Fidelity Design Specification

> **Authorized Educational / Development Recreation Notice**
> This project is a frontend engineering recreation of `https://www.sleekautosales.com/` created strictly for development and demonstration purposes. All forms execute client-side only with explicit local confirmation notices; no customer personal, contact, or financial data is transmitted to Sleek Auto Sales Inc. or DealerCenter.

---

## Phase 1: Reference Site Inspection Summary

| Page / Route | Reference URL | Status | Observed Layout & Features |
| :--- | :--- | :--- | :--- |
| **Homepage** | `https://www.sleekautosales.com/` | Live (200) | Top utility bar (`#ECECEC`), sticky shrinking white header (`#FFFFFF`), full-bleed lifted black dually hero (`16:5`) with right-offset overlay (`TRUST IN US, DRIVE IN STYLE!`), 50/50 split bar (`USED INVENTORY` / `SPECIAL OFFER`), black `1320px` search filter container, full-bleed US Flag `WELCOME ALL MILITARY!` banner, `#F0F0F0` two-column `WELCOME TO SLEEK AUTO` section with transparent cutout truck, 3×2 `BRANDS WE CARRY` badge grid, 6-card `FEATURED SPECIAL` carousel, `#E9E9E9` + `#999999` global footer. |
| **Inventory (`TRUCK SHOP`)** | `https://www.sleekautosales.com/inventory/` | Live (200) | Title `TRUCK SHOP`, 2-column layout (`270px` left `Search Filter` sidebar with sliders, accordion facet counts, `Reset Filters` pill button, `Recently Viewed` card; right listing stream with `Keyword Search`, `Page Size`, `Sort By`, List/Grid toggle, 20 vehicles across 2 pages, `Compare` checkboxes, `AutoCheck` badge, `CONFIRM AVAILABILITY` / `APPLY CREDIT` / `VIEW DETAILS` action buttons, pagination bar). |
| **Vehicle Detail (VDP)** | `/inventory/:make/:model/:stock/` | Live (200) | `Back To Listing`, vehicle title + price (`*Fees Not Disclosed`), multi-photo gallery + thumbnails, 2-column `VEHICLE SPECIFICATIONS`, action buttons (`APPLY ONLINE`, `CHECK AVAILABILITY`, `TEST DRIVE`, `View Autocheck Report`), interactive `LOAN CALCULATOR`, tabbed `VEHICLE EQUIPMENT` & `VEHICLE DESCRIPTION`, and `SIMILAR VEHICLES` carousel. |
| **Special Offer** | `https://www.sleekautosales.com/vehicle-special/` | Returns 404 on live site | Documented platform limitation: clicking `SPECIAL OFFER` on the live site points to `/vehicle-special/` which returns DealerCenter's 404 page; we support `/vehicle-special` cleanly by filtering/displaying Featured Special vehicles with a transparent note of the original link behavior. |
| **Car Finder** | `https://www.sleekautosales.com/car-finder/` | Live (200) | White header band (`CAR FINDER`) above full-bleed `#D3D1D1` light-gray section containing centered `580px` form (`Vehicle Information`, `Contact Information`, 1,024-char live counters, `#CECCCC` SMS consent box, dark pill `Submit` button). |
| **Apply Online** | `https://www.sleekautosales.com/apply-online/` | Live (200) | White background, `APPLY ONLINE` title, `724px` container, `Buyer` / `Co-Buyer` tabs, `Personal Information`, `Residential Information` (`+ Add Previous Address`), `Employment Information` (`+ Add Previous Employment`), `Interested Vehicle` live inventory selector (`+ Add Trade-in?`), `#F7F7F7` credit authorization disclosure, black pill `Submit` button (demonstration-only; sensitive inputs redacted). |
| **About Us** | `https://www.sleekautosales.com/about-us/` | Live (200) | `ABOUT US` heading followed by balanced 2-column dealership mission & community copy over white background. |
| **Contact Us** | `https://www.sleekautosales.com/contact-us/` | Live (200) | Top white 2-column section (`We Welcome Your Feedback and Comments` left copy + `Contact Information` right form with `Phone / Email / SMS` checkboxes & consent box) + lower `#F2F2F2` full-bleed section 
| **Privacy Policy** | `https://www.sleekautosales.com/privacy-policy/` | Live (200) | Single-column legal disclosure text (`PRIVACY POLICY`). |
| **Terms of Use** | `https://www.sleekautosales.com/terms-of-use/` | Live (200) | Single-column SMS & site Terms of Service (`TERMS OF USE`). |
| **Sitemap** | `https://www.sleekautosales.com/sitemap/` | Live (200) | Directory list of primary site navigation links (`Sitemap`). |

---

## Phase 2: Measured Visual & CSS Design Tokens (Extracted at 2× Retina `5120×2880`)

### 1. Color Palette
- **Top Utility Bar Bg**: `#ECECEC` (`rgb(236, 236, 236)`)
- **Header & Primary Page Bg**: `#FFFFFF` (`rgb(255, 255, 255)`)
- **Primary Brand Black / Search Container**: `#000000` (`rgb(0, 0, 0)`)
- **Split Bar Left (`USED INVENTORY`)**: `#212121` (`rgb(33, 33, 33)`)
- **Split Bar Right (`SPECIAL OFFER`)**: `#403F3F` (`rgb(64, 63, 63)`)
- **Hero Headline Red (`TRUST IN US,`)**: `#EA3724` (`rgb(234, 55, 36)`)
- **Military Subtitle Red**: `#CB3024` (`rgb(203, 48, 36)`)
- **Welcome Section Bg**: `#F0F0F0` (`rgb(240, 240, 240)`)
- **Car Finder Outer Band Bg**: `#D3D1D1` (`rgb(211, 209, 209)`)
- **Car Finder Consent Box Bg**: `#CECCCC` (`rgb(206, 204, 204)`)
- **Contact Lower Office/Map Band Bg**: `#F2F2F2` (`rgb(242, 242, 242)`)
- **Featured Card Price Footer Bg**: `#505050` (`rgb(80, 80, 80)`)
- **Action Pill / VLP Buttons (`UPDATE`, `CONFIRM AVAILABILITY`, `Submit`)**: `#4D4D4D` hover `#222222`
- **Footer Main Bg**: `#E9E9E9` (`rgb(233, 233, 233)`)
- **Footer Copyright Bar Bg**: `#999999` (`rgb(153, 153, 153)`)
- **Body Text**: `#333333` / `#222222`, Secondary labels `#555555`

### 2. Typography
- **Hero Display (`TRUST IN US, DRIVE IN STYLE!`)**: `'Open Sans', sans-serif` (`800` ExtraBold uppercase headline `#EB3824` / `#FFFFFF`, `400` Regular body subline, `600` SemiBold bordered button)
- **Navigation, Split CTA & Section Headings**: `'Titillium Web', sans-serif`
  - Hero Headline Line 1 (`TRUST IN US,`): `52px` (`800`, uppercase, `#EB3824`, line-height `1.08`)
  - Hero Headline Line 2 (`DRIVE IN STYLE!`): `52px` (`800`, uppercase, `#FFFFFF`, line-height `1.08`)
  - Section & Page Headings (`TRUCK SHOP`, `CAR FINDER`, `APPLY ONLINE`, `ABOUT US`, `CONTACT US`, `WELCOME ALL MILITARY!`, `WELCOME TO SLEEK AUTO`, `BRANDS WE CARRY`, `FEATURED SPECIAL`): `32px–35px` (`400–700`, uppercase, `#212121`)
  - Main Navigation Links: `16.5px` (`400`, uppercase, `#222222`, active state has `border-top: 2.5px solid #000` and `border-bottom: 2.5px solid #000`, staying visible across desktop & split-screen preview widths down to `840px`)
- **Vehicle Cards, Filter Controls & Footer UI**: `Arial, 'Helvetica Neue', sans-serif` (`11px–16.5px`)
- **Body & Form Copy**: `'Open Sans', 'Roboto', sans-serif` (`14px–15px`, weight `400`, line-height `1.62`)

### 3. Container & Section Geometry
- **Max Container Width**: `1320px` (responsive padding `15px`; inner form containers: `724px` on Apply Online, `580px` on Car Finder)
- **Top Utility Bar Height**: `58px` (sticky with header)
- **Main Header Height**: `156px` initial → shrinks to `60px` on scroll (`scrollY > 50`)
- **Hero Aspect / Height**: `width: 100%`, aspect `16 / 5` (`min-height: 440px` desktop, `800px` at `2560px`)
- **Split CTA Strip Height**: `98px` (`50% / 50%` full-bleed)
- **Homepage Search Box**: `1320px × 236px` (`#000000`, `64px` vertical margins)
- **Military Banner Height**: `368px` full-bleed
- **Responsive Breakpoints**: `1440px`, `1366px`, `992px`, `768px`, `390px`, `375px`
