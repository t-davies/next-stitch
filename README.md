# next-stitch

Stitches together multiple Next.js apps.

## Why do I want to do that!?

Scaling the development of a Next.js application across multiple teams
can be difficult and can lead to a lack of innovation and experimentation
if everyone standardises on a single toolchain.

`next-stitch` allows teams to own a Next.js application that serves just
their pages and then have this stitched into a larger shell application
at build time. Everything ends up as one big app, so client-side state
is maintained during page transitions - unlike if you were hosting multiple
seperate apps.

Check out `/example` and `/example-shell` for a _very_ brief demo.

## Caveats

- SASS and CSS imports (including modules) do work, but you will lose
  some of the dead code elimination and other niceness you get for free
  if everything was being built in a single app.
  - The downside of this is that CSS gets bundled up and you must
    include this in a custom app component, depending on the amount
    of CSS you have this could result in you loading a lot of unused
    CSS for certain pages - you can of course CDN cache this though.

## Roadmap

- Add support for `public` folder for images and other static content

# License

MIT - see LICENSE
