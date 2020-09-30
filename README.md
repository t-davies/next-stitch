# next-stitch

Stitches together multiple Next.js apps.

## Quick start

1. Prepare your child Next.js app

   ```(bash)
   npm install --save-dev next-stitch
   next-stitch prepare pages
   npm publish
   ```

2. Install your package in your parent Next.js app

   ```(bash)
   npm install @my-org/prepared-child-package
   ```

3. Create a `.stitchrc.json` file, so we know which packages to stitch

   ```(json)
   {
     "packages": ["@my-org/prepared-child-package"]
   }
   ```

4. Stitch everything together and celebrate
   ```(bash)
   npm install --save-dev next-stitch
   next-stitch stitch
   next
   ```

### Why do I want to do this?

Scaling the development of a Next.js application across multiple teams
can be difficult, one approach is to host multiple apps however this adds
operational overhead and you lose the ability to maintain client-side state
easily as users navigate around your app.

`next-stitch` allows teams to own a Next.js application that serves just
their pages and then have this stitched into a larger shell application
at build time. Everything ends up as one big app, so client-side state
is maintained during page transitions - unlike if you were hosting multiple
seperate apps.

These apps run just like regular Next.js apps, so the great developer
experience that Next offers is maintained. You can still use all of the
features of Next.js, including ISR and static generation.

Check out `/example` and `/example-shell` for a _very_ brief demo.

## Caveats

- SASS and CSS imports (including modules) do work, but you'll need to include
  the entire bundle in a custom <App /> component. Depending on the amount of
  CSS you have this could result in loading a lot of unused CSS on each page.

## Roadmap

- Add support for `public` folder for images and other static content

# License

MIT
