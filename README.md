This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## App Behaviour
Once the app opens in the browser, you can expect a view similar the one below ![Screenshot](https://imgur.com/N3EafYo).

* Line chart is displayed on the right.
  + Initial data is fetched from the API
  + If the API is offline, the chart remains empty and an error message is displayed on top of the chart.
  + The X-Axis represents the time in UTC
  + The Y-Axis represents the corresponding value
  + User can hover over the points to get readings of the point
  + Adding a new point will resize the the scales, axes and chart to reflect the new data set

* The Add Point chart is displayed on the left.
  + It has two fields - ISO Date Time & Value
  + User has to enter text that represents a valid ISO Date Time and a Numeric value
  + Non-Empty values are not accepted
  + Once the User hits the 'add' button, the Chart gets updated optimistically while the API call for the saving point happens
  + Should the API call be successful, the Chart continues in its current form and the Add Point form is reset
  + Should the API call fail, the Add Point form continues to hold previously entered values and the Chart is reset to it's previous shape. An error message is also displayed prompting the user to resubmit.
