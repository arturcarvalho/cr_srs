[![Netlify Status](https://api.netlify.com/api/v1/badges/5e039406-00ce-4a36-a25e-6ef2eaa73271/deploy-status)](https://app.netlify.com/sites/zealous-booth-c55977/deploys)

## dev start

> npm start

## Decisions (higher are more recent)

- Files starting with underscore are drafts.
- The markdown is an article when the md file has the same name as the folder it's in.
- Using the convention to use lower case file names for the componentsto fit with gatsby conventions.
- Going to move everything to CSS modules. Starting with the card components.
- Not doing tests yet, the idea is still not consolidated.
- Having the cards independent seems like a bad idea, so I'm making them dependent on articles. That way there's no need to manage IDs or learn more links. Every card has an article associated with it. Even if it's a stub.

## Structure

- I want to be able to move cards around, even if they just belong to one article (easy article split)
- It's possible to change article url by changing title, but don't change the file name.

- article bla.md is stored inside folder articles/bla/bla.md.
- The article and folder name must be the same (excluding .md)
- The other files inside an article folder are the cards.

/articles/kebab-title: http://localhost:8000/articles/javascript-sleep
/cards/filename: http://localhost:8000/cards/4-3
/posts/kebab-title: http://localhost:8000/posts/new-beginnings

## Credits

arrow: https://iconmonstr.com/arrow-24-svg/

Used this image to create the logo: https://pixabay.com/illustrations/background-abstract-futuristic-1462755/
