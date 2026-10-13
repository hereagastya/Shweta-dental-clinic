---
name: Dr. Shweta Dental Clinic
description: Editorial Luxe smile-design folio; enamel ivory, warm ink, malachite fields and gilt proportion lines.
colors:
  enamel: "#F3ECDF"
  vellum: "#E8DCC6"
  paper: "#FBF7F0"
  ink: "#1C1A16"
  ink-soft: "#4A453C"
  ink-mute: "#6B6456"
  malachite: "#163A32"
  malachite-deep: "#0F2B25"
  malachite-line: "#2E5449"
  gilt: "#9C7432"
  gilt-bright: "#D9BD86"
  gilt-soft: "#C7A566"
  gilt-ink: "#7A5A20"
  on-dark: "#EFE6D3"
  on-dark-mute: "#B9C2B4"
  error: "#8A2F25"
typography:
  display-hero:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "clamp(3.6rem, 17vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  display:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "clamp(2.6rem, 10.5vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "clamp(1.6rem, 6.4vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "1.35rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  letter:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"lnum\" 1"
  label:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
  button:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.005em"
  script:
    fontFamily: "Mrs Saint Delafield, cursive"
    fontSize: "3.6rem"
    fontWeight: 400
    lineHeight: 1
rounded:
  plate: "4px"
  sheet: "6px"
  pill: "99px"
  arch: "999px 999px 4px 4px"
  arch-chip: "99px 99px 10px 10px"
  circle: "50%"
spacing:
  gutter: "clamp(1.25rem, 5vw, 4rem)"
  section: "clamp(5rem, 12vw, 9.5rem)"
  max: "82rem"
  header: "4.25rem"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.enamel}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.6rem"
    height: "3.25rem"
  button-ink-hover:
    backgroundColor: "{colors.malachite}"
    textColor: "{colors.enamel}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.6rem"
    height: "3.25rem"
  button-line-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  button-gilt:
    backgroundColor: "{colors.gilt-bright}"
    textColor: "{colors.malachite-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.6rem"
    height: "3.25rem"
  chip-filter:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.1rem"
  chip-filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.enamel}"
  chip-preference-selected:
    backgroundColor: "{colors.malachite}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.pill}"
    height: "2.6rem"
  input-field:
    backgroundColor: "{colors.enamel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "0.8rem 1rem"
    height: "3.25rem"
  day-cell-selected:
    backgroundColor: "{colors.malachite}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.arch-chip}"
    width: "4.4rem"
  slot-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.enamel}"
    rounded: "{rounded.pill}"
    height: "2.9rem"
  booking-sheet:
    backgroundColor: "{colors.enamel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    width: "min(34rem, 100%)"
  enquiry-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "clamp(1.5rem, 5vw, 2.75rem)"
  actionbar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.pill}"
    padding: "0.3rem"
  actionbar-book:
    backgroundColor: "{colors.gilt-bright}"
    textColor: "{colors.malachite-deep}"
    rounded: "{rounded.pill}"
    height: "3rem"
---

# Design System: Dr. Shweta Dental Clinic

## Overview

**Creative North Star: "The Made-to-Measure Folio"**

The site is a tailor's folio for smiles. An enamel-ivory page carries warm ink type, Bodoni Moda headlines set very large and tight, and thin gilt lines that measure things: a ruled scale marked 0, 0.618, 1 and 1.618 under the hero headline, golden-section guides drawn over the hero photograph, and faint golden-section verticals inside the malachite studio. Every photograph sits in an arch-topped deco frame. Most arches are ringed by a second gilt outline set a few millimetres off the image, like a mount in a frame shop.

Density is low and the pace is slow. Sections are separated by generous vertical space (clamp 5rem to 9.5rem) and by changes of ground colour, not by cards. The page moves between enamel, paper and two depths of malachite, which fill whole sections edge to edge, and ends on an ink footer. Interaction is quiet and precise: one load sequence (headline lines rise, the ruler draws in, the arch opens upward, the gilt guides trace across the photo), soft expo-out easing everywhere, and real measured numerals in the studio readout.

Lists are hairline-ruled indexes (treatments, credentials, FAQ, hours, booking summary), each opened by a full-strength ink rule and divided by faint ink hairlines. Pills are reserved for things you press or choose.

**Key Characteristics:**
- Enamel ivory ground, warm ink type, gilt used as line and numeral, never as fill area.
- Malachite owns whole sections (Smile Studio, clinic gallery, mobile menu); it is never a small card colour.
- Arch-topped frames for every photograph, most with an offset gilt outline.
- Bodoni Moda display at very large sizes with negative tracking; Hanken Grotesk for reading; one script signature.
- Proportion motif (0.618 / 1 / 1.618) drawn as rulers, ticks and guides.
- Pills for actions and choices only; ruled indexes for content lists.

## Colors

A warm, paper-and-ink palette with one deep green and one metal: ivory grounds, brown-black ink, Bombay-deco malachite, and gilt in four strengths.

### Primary
- **Warm Ink** (ink): primary text, the opening rule of every list, the primary "Book a consultation" button, selected filter chips and time slots, and the footer ground. At 0.92 to 0.94 alpha it is also the mobile action bar.

### Secondary
- **Bombay Malachite** (malachite): the Smile Studio section, the mobile menu, the monogram roundel, selected booking choices (preference chips, day cells, radio options) and the ink button's hover. Its two companions: **Deep Malachite** (malachite-deep) grounds the clinic gallery and sets text on gilt buttons; **Malachite Hairline** (malachite-line) draws rules, slider tracks and dividers inside malachite fields.

### Tertiary
- **Gilt** (gilt): hairlines, ruler ticks, offset frame outlines, quotation marks, step numerals, FAQ chevrons, focus rings and the booking progress bar. Line and large numeral only.
- **Bright Gilt** (gilt-bright): gilt on dark grounds; studio drawings and readout ratio, footer wordmark, the gilt button and the action bar's Book button, text selection.
- **Soft Gilt** (gilt-soft): gallery frame outlines, the toggle's on state, scrollbar thumb, input focus halo (at 0.28 alpha).
- **Gilt Ink** (gilt-ink): the only gilt used for small text on light grounds: fees, the doctor's role line, ruler numerals.

### Neutral
- **Enamel** (enamel): the page ground, booking sheet ground, input fill and text on ink buttons.
- **Paper** (paper): a lifted ivory for the doctor section, the enquiry card, booking option rows, day cells and slots.
- **Vellum** (vellum): image placeholder behind arches and the map frame.
- **Soft Ink** (ink-soft) and **Muted Ink** (ink-mute): supporting copy and captions/meta, respectively.
- **On-Dark** (on-dark) and **On-Dark Mute** (on-dark-mute): text inside malachite and ink fields.
- **Error Oxide** (error): invalid field borders and messages.

### Named Rules
**The Gilt Is a Line Rule.** Gilt draws, measures and marks; it does not fill panels. The only gilt fills are pressable: the gilt button, the action bar's Book button, shade chips, the slider thumb.

**The Gilt Ink Rule.** Small text in gold on a light ground uses gilt-ink. Plain gilt on enamel is only about 3.6:1, so it is reserved for hairlines, ticks and numerals at display size (step numbers at 4.5rem).

**The Whole-Field Malachite Rule.** Malachite arrives as a full-bleed section or overlay, never as a tinted card on ivory.

## Typography

**Display Font:** Bodoni Moda (with Didot, Bodoni 72, Georgia), optical sizing on
**Body Font:** Hanken Grotesk (with system-ui, Segoe UI)
**Script:** Mrs Saint Delafield, used once as Dr. Shweta's signature

**Character:** A high-contrast Didone set huge and tight against a clean, warm grotesk. The serif carries every heading, list name, quote, address and numeral readout. The sans carries reading, labels and buttons.

### Hierarchy
- **Display Hero** (400, clamp(3.6rem, 17vw, 6rem); desktop clamp(5rem, 8.4vw, 8.6rem), line-height 0.9, -0.04em): the hero headline only, broken into three staggered lines (second indented 14%, third 4%).
- **Display** (400, clamp(2.6rem, 10.5vw, 5.25rem), 0.98, -0.035em, balanced wrap): every section heading. The mobile menu links use the same voice at clamp(2.4rem, 11vw, 3.4rem).
- **Headline** (400, clamp(1.6rem, 6.4vw, 2.6rem), 1.05): treatment names in the index; testimonial quotes run larger at clamp(1.65rem, 6.8vw, 3.1rem)/1.18.
- **Title** (400, 1.2 to 2.1rem serif): step titles (1.6rem), FAQ questions (1.35rem), gallery captions, booking step headings (2.1rem), option names (1.2rem).
- **Letter** (400, 1.25rem/1.55 serif; lead paragraph 1.5rem/1.4): the doctor's letter and the visit address.
- **Body** (400, 1.0625rem/1.6 sans, lining numerals): reading copy, held to 30 to 40rem measures.
- **Label** (400 to 500, 0.8125 to 0.9375rem sans, sentence case, no tracking): captions, meta, field labels, readout labels.
- **Script** (3.6rem, rotated -4deg, malachite): the signature under the doctor's letter. One instance.

### Named Rules
**The Serif Numeral Rule.** Measured numbers that matter (step numbers, readout values, day numbers, booking reference, counters) are set in Bodoni Moda with lining, tabular figures.

**The Sentence-Case Label Rule.** Labels and meta are sentence case at normal tracking. The system has no uppercase tracked labels.

## Layout

A single editorial column on mobile, widening to a 12-column grid at 1024px. Content is capped at 82rem with a fluid gutter (clamp 1.25rem to 4rem); malachite, paper and ink sections run full-bleed and re-inset their content to the same column.

- **Asymmetry over centring.** Desktop splits are 7/5 and 5/7 (section heads, studio, FAQ, visit, footer). The hero headline takes columns 1 to 7 and the arch takes 7 to 12, overlapping by one column with a -2.5rem pull.
- **Stepped baselines.** The four journey steps drop 0, 3, 6 and 9rem on desktop; gallery figures drop 0, 6 and 2rem.
- **Horizontal scroll on mobile.** Journey steps (82% wide), gallery (74%), testimonials (100%), filter chips and booking days scroll with snap and hidden scrollbars; on desktop journey and gallery become static grids.
- **Breakpoints:** 720px (two-column treatment rows, centred booking dialog, three-column footer) and 1024px (desktop nav, 12-column hero, action bar removed).
- **Sticky companions.** The doctor portrait and the enquiry card stick below the header on desktop.

## Elevation & Depth

Depth comes from ground changes (enamel, paper, malachite, ink) and hairlines, not from shadows. Shadows appear only on elements that float above the page.

### Shadow Vocabulary
- **Floating bar** (`box-shadow: 0 12px 32px rgba(28, 26, 22, .28)`): the mobile action bar.
- **Dialog** (`box-shadow: 0 30px 80px rgba(15, 43, 37, .35)`): the booking sheet from 720px up, over a malachite backdrop (rgba(15, 43, 37, .55), 4px blur).
- **Header hairline** (`box-shadow: 0 1px 0 rgba(156, 116, 50, .28)`): the masthead once it turns solid (enamel at 0.92 with backdrop blur).
- **Gilt ring** (`box-shadow: 0 0 0 2px var(--malachite), 0 0 0 3px var(--gilt-bright)`): the selected shade chip; the booking seal uses the same double ring on enamel.

### Named Rules
**The Float-Only Shadow Rule.** A shadow means the element floats (action bar, dialog, slider thumb). Sections and cards sit flat on their ground.

## Shapes

Three silhouettes do all the work.

- **The arch** (999px 999px 4px 4px): every photograph, and the treatment images inside the index. Arches clip a vellum or malachite placeholder and open upward on reveal.
- **The offset gilt outline:** a 1px gilt ring set off the arch. On the hero and doctor plates it is a pseudo-frame inset -0.6rem with a 999px 999px 6px 6px radius; on gallery and treatment images it is an outline offset 0.45rem (gilt-soft on malachite, gilt on ivory).
- **The arch-chip** (99px 99px 10px 10px): shade chips and booking day cells, the arch reduced to a control.
- **Pill** (99px) for buttons, chips, slots, inputs on dark and the action bar; **circle** for icon buttons, the monogram and the booking seal; **plate** (4px) for fields, the enquiry card, booking options and the map. Nothing else is rounded.

## Components

### Buttons
Calm, solid pills with a gentle press.
- **Shape:** full pill (99px), 3.25rem tall (2.5rem small), 1rem medium sans.
- **Ink (primary):** ink fill, enamel text; hovers to malachite.
- **Line (secondary):** transparent with a 28% ink hairline; hovers to a full ink border on paper. Used for WhatsApp and secondary actions.
- **Gilt:** bright gilt fill with deep-malachite text; used on malachite grounds.
- **States:** 0.35s expo-out colour transitions, scale(0.98) on press, 0.45 opacity when disabled, loading swaps the label for a thin spinning ring.
- **Text actions:** a sans label underlined by a 1px gilt rule with an arrow that nudges 4px on hover.

### Chips
- **Filter chips:** transparent pills with a 20% ink hairline; selected fills ink with enamel text.
- **Preference chips** (enquiry form): same pill, selected fills malachite.
- **Shade chips:** arch-chips filled with the shade colour, lifting 3px on hover; selected adds the gilt double ring.

### Cards / Containers
- **Corner Style:** plate (4px); the booking sheet is 6px on desktop.
- **Background:** paper on enamel.
- **Shadow Strategy:** flat; see Elevation.
- **Border:** 1px gilt at 35% alpha.
- **Internal Padding:** clamp(1.5rem, 5vw, 2.75rem).

### Inputs / Fields
- **Style:** enamel fill, 1px ink hairline at 22%, plate radius, 3.25rem tall; selects carry a small gilt chevron.
- **Focus:** border turns gilt, a 3px soft-gilt halo appears and the fill brightens to white.
- **Error:** border and message in error oxide.
- **On dark** (footer newsletter): transparent pill with a warm grey hairline that turns bright gilt on focus.

### Navigation
- **Masthead:** transparent over the hero, turning solid enamel with blur and a gilt hairline on scroll; hides on scroll down. Monogram roundel (malachite with an inset gilt ring) beside a serif wordmark.
- **Desktop:** sans links at 0.9375rem with a gilt underline that wipes in from the left on hover and for the active section.
- **Mobile menu:** a full-screen malachite overlay that opens as a circle from the menu button; large serif links with sans sub-lines, divided by malachite hairlines, staggering in.

### Treatment Index
An accordion of serif treatment names with gilt-ink fees, ruled by ink hairlines. The row name slides 6px on hover; a circular plus rotates 45deg and fills ink when open; the body opens by grid-row animation to reveal an arched, gilt-outlined image and a gilt-ruled facts list.

### Smile Studio (signature)
A malachite section in which six drawn teeth reshape between "before" and "after" golden proportion. Gilt-bright line drawing with dashed measurement guides and tabular labels; a range scrubber with a 2px gilt progress track and a gilt thumb ringed in malachite; six arch-chip shade buttons; a guides toggle; and a serif readout whose ratio row is set in bright gilt. Faint golden-section verticals (38.2% and 61.8%) run behind the section.

### Proportion Ruler
A gilt rule with eleven ticks (every fifth one taller) and numerals 0, 0.618, 1, 1.618 in gilt-ink. It draws in from the left on load. The same proportions recur as hero photo guides and studio verticals.

### Booking Sheet
A four-step dialog: full-screen on mobile, a centred 34rem sheet from 720px. Header with circular back/close buttons and a tabular step counter over a gilt progress hairline. Steps slide in from the right. Choices are paper option rows with malachite radio fills, arch-chip day cells (selected malachite with a bright-gilt weekday), pill time slots (selected ink; unavailable slots dashed and struck through), and an ink-ruled summary. Confirmation shows a malachite seal with a double gilt ring and a check that draws in.

### Mobile Action Bar
A floating ink pill (94% alpha, blur) above the safe area with three targets in a 1 : 1 : 1.6 grid: Call, WhatsApp, and a bright-gilt Book pill. Icons are bright gilt. It slides up once the hero is passed and is removed at 1024px.

## Do's and Don'ts

### Do:
- **Do** frame every photograph in an arch (999px 999px 4px 4px), and give featured images the offset 1px gilt outline.
- **Do** let malachite and ink take whole sections; move between enamel, paper, malachite and ink to separate sections.
- **Do** use gilt-ink for small gold text on light grounds and gilt-bright for gold on dark grounds.
- **Do** set headings, list names, quotes and important numerals in Bodoni Moda with lining figures, and reading copy in Hanken Grotesk at 1.0625rem/1.6.
- **Do** build content lists as ruled indexes: a full ink rule on top, faint ink hairlines between rows.
- **Do** use the expo-out ease (cubic-bezier(.16, 1, .3, 1)) for transitions, and keep the reduced-motion override that collapses all motion.
- **Do** keep a booking action one tap away on mobile (the action bar) and on desktop (the masthead).

### Don't:
- **Don't** fill panels, cards or backgrounds with gilt; it is a line, a numeral or a pressable control.
- **Don't** use plain gilt for small text on enamel or paper (about 3.6:1).
- **Don't** put a photograph in a plain rectangle or a uniformly rounded card.
- **Don't** use pills for content containers; pills mean "press" or "choose".
- **Don't** add uppercase tracked labels or eyebrow lines above headings; headings stand alone.
- **Don't** add shadows to sections or in-flow cards; shadows are for floating elements only.
- **Don't** use the script face for anything but the doctor's signature.
