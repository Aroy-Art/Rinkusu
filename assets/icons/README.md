# Icons

SVG files here are inlined by `layouts/partials/icon.html`:

    {{ partial "icon.html" (dict "name" "lucide/info") }}

- `lucide/` — UI icons from [Lucide](https://lucide.dev) (ISC license), stroke based.
- `brand/` — brand logos from [Simple Icons](https://simpleicons.org) (CC0), fill based.
  `brand/fediverse.svg` is from [Phosphor Icons](https://phosphoricons.com) (MIT),
  as Simple Icons has no Fediverse logo.

To add an icon, drop its `.svg` into the matching folder and reference it as
`<folder>/<file name without .svg>`. A site can add or override icons by
placing files at the same path in its own `assets/icons/`.
