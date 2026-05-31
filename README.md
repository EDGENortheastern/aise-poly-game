# Polygon Quiz

Polygon Quiz is a small React and TypeScript game about recognising polygons. The player is shown a shape, counts the sides, types the polygon name, and moves through a five question round. At the end, the game shows the final score and lets the player start again.

This is a graphic project as much as a quiz project. The interesting part is not only the answer checking. The app draws the shape itself using SVG, so the player is not looking at fixed image files. Each polygon is generated from code.

## What the game does

The game creates a short round of polygon questions. Each question stores the number of sides and the correct answer. React uses that question data to decide what to show on screen. If the question has five sides, the SVG component draws a pentagon. If the question has eight sides, it draws an octagon. The player does not see the data directly, but the whole interface is driven by it.

The answer checker is deliberately forgiving. It ignores capital letters and extra spaces, so `Octagon`, ` octagon `, and `OCTAGON` are treated as the same answer. It also accepts a few alternative polygon names where that makes sense, such as square for a four sided polygon.

## How React is used

React breaks the game into small pieces. The main `App` component gives the page its title and then hands the actual quiz to `QuizGame`. `QuizGame` manages the current round, the current question number, the player’s typed answer, the score, and whether the round has finished.

When the player types into the input, React stores that text in state. When the player submits an answer, React checks the guess, updates the result, and re renders the screen. That is why the page can switch from the input form to the feedback message without loading a new page.

The game feels simple on the surface, but it uses the core React idea properly. The screen is a reflection of state. Change the state, and React updates the screen.

## How the SVG drawing works

The `PolygonSvg` component draws the shape using the browser’s built in SVG support. It does not use a picture of a triangle, square, pentagon, or octagon. It calculates the points of the polygon and passes them into an SVG `<polygon>` element.

The component receives a number of sides. It then works around a circle and calculates one vertex for each side. For a hexagon, it calculates six points. For a decagon, it calculates ten points. The points are joined into the SVG `points` attribute, and the browser draws the polygon from those coordinates.

This is a useful way to teach graphics because the visual output comes from maths and code rather than from copied image assets. The same component can draw many shapes because the number of sides is data.

## Component map

`main.tsx` starts the React app and places it inside the page.

`App.tsx` gives the project its title and tagline, then renders the quiz.

`QuizGame.tsx` controls the game flow. It creates a round, shows the current question, records the player’s answer, checks the result, moves to the next question, and shows the final score.

`PolygonSvg.tsx` draws the polygon for the current question. It turns a number of sides into SVG coordinates.

`quizEngine.ts` contains the quiz logic. It creates rounds, checks answers, handles accepted alternatives, and keeps the logic away from the interface.

`polygonNames.ts` contains the polygon name lookup. It knows which names match which side counts and rejects values that are not supported.

`index.css` styles the game so the quiz feels like one complete small product rather than a raw coding exercise.

## How the tests were written

The tests were written around behaviour, not around private implementation details. That matters because a user does not care what a state variable is called. A user cares whether the title appears, whether a polygon appears, whether the answer can be submitted, and whether the score is correct.

The domain tests check the plain logic first. `polygonNames.test.ts` checks that side counts return the right names, that shapes with fewer than three sides are rejected, and that unsupported values do not silently pass. `quizEngine.test.ts` checks that answers are accepted correctly, that spaces and capital letters do not break a correct answer, that synonyms work, and that generated rounds contain valid, non repeated polygons.

The SVG tests check the graphic part directly. `PolygonSvg.test.tsx` renders the SVG and checks that it is accessible as an image. It also reads the `<polygon>` points and counts them. That means the test can prove a six sided question really produces six vertices. Another test checks that every vertex stays inside the SVG viewport, which is important because a drawing can technically exist while still being partly off screen.

The game tests use React Testing Library and user event to interact with the app more like a real player. The tests type answers, click buttons, move through the round, and check the final score. A fixed round is injected into `QuizGame`, so the tests do not depend on random questions. That makes the tests reliable and repeatable.

This is the stronger testing pattern in the project. Randomness is useful for the player, but it is awkward for tests. By allowing the game to receive a known round during testing, the app keeps the real behaviour while the tests stay predictable.

## Why this project is useful

This project is small enough to understand, but it still has the shape of a real React app. It has separate UI components, separate domain logic, generated graphics, stateful interaction, and automated tests.

It is also a good teaching project because the player can see the code working visually. When the number of sides changes, the shape changes. When the answer is submitted, the feedback changes. When the round ends, the result screen appears. That makes React’s state driven model easier to understand because each change has an obvious effect on the screen.

## Running the project locally

Install the dependencies with

```bash
npm install
```

Start the development server with `npm run dev`.

Run the tests in watch mode with `npm test`.

Run the tests once with `npm run test:run`.

Create a production build with `npm run build`.

## Final note

Polygon Quiz is not trying to be a huge app. It is a clean, focused example of how React, TypeScript, SVG, and tests can work together. The game gives learners something visual to play with, while the codebase shows how to keep logic, graphics, and interaction separated clearly.
