# balsam test automation
Test automation framework using playwright and Typescript.

# setup
This repository is public.
Create a local folder and clone using the below git URL:
    https://github.com/jbuen17/balsam_assessment.git

Make sure to run the following before any execution:
    npm install
    npm install dotenv --save

# execution
Open the playwright.config.ts and uncomment the needed browser for testing using parallel runs. By default, Chrome is set as the base browser for execution.
(I have encountered slow loading issues from the site so I recommend running the test on each browser at a time instead.)

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // {
    //   name: 'edge',
    //   use: {...devices['Desktop Edge']},
    // }

Use the following command to run the test:
    
**NOTE: you may add --headed on the following command if you wish to see the actual execution on the browser
    
    npx playwright test


# reporting

You may view the eecution report using the command below:

    npx playwright show-report