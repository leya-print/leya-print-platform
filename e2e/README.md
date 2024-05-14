## End-to-end-tests

To validate that all components of the system are functioning together as intended we introduced end-to-end tests.
In theory, end-to-end testing (E2E testing) is the process of testing a piece of software from start to finish as it will be used by the actual users.
 
The specs (tests) can be found under the e2e/tests folder.
There is a config file in the e2e folder to config which browser should be used for testing.

**Test Locally:**

To run the tests on a local copy of Leya, the property baseURL from the playwright.config.ts file has to be changed a valid URL (local UI service URL, deployed online version of UI).
Execute the command:

e2e/:
```
npm test
```
The command will execute the command playwright test --headed which will run the tests in an active browser.
The tests might fail at first because there are no other snapshots to compare to, running the tests again should make them pass.

**Test on Gitpod:**

Running the tests on Gitpod is a little different since they cannot run with --headed one test will always fail because without the option active a snapshot cannot be taken of a newly opened tab.

The script run-in-docker.sh can be executed to run the tests with --headed in a docker container, don't forget to change the LEYA_E2E_BASE_URL variable in the shell script.

Execute the command:

e2e/:
```
sh run-in-docker.sh
```

**Tests in Pipeline:**

To run the tests in the same type of container as will run in the ci/cd pipeline run the command:

e2e/:
```
docker-compose run e2e-test
```

**Snapshosts:**

In the e2e folder there is a snapshots folder with the /user and /ci sub-directories that will hold snapshots of the tests done.
The user is for current user's instance tests and in ci are the ones from the pipeline.

**Docker/Scripts:**

For testing flexibility in ci-cd pipelines the tests are also present in a docker container, the container can be started and the tests can be run locally as well.
The run-in-docker.sh script runs the tests in docker and shell-in-docker opens a bash terminal for any additional needs in the container.

