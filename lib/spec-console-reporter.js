
colors = {
    pass: () => '\033[32m', //Green
    fail: () => '\033[31m', //Red
    neutral: () => '\033[0m', // black
    heading: () => '\033[1;34m', //Light blue
    sub_heading: () => '\033[1;30m', // Dark Gray
    highlight: () => '\033[1;33m' //Yellow
}

var log = console.log;

var consoleReporter = {

    specStarted: undefined,
    jasmineTestsStarted: undefined,

    jasmineStarted: (jasmine) => {
        jasmineTestsStarted = new Date();
        log(colors.heading());
        log('--------------------------------------');
        log('         Begin of tests Run           ');
        log('--------------------------------------');
        log(colors.neutral());
        log('Started Executing test cases @ ' + colors.highlight() + jasmineTestsStarted.toLocaleString());
        log(colors.neutral());
        log('Total specs defined = ' + jasmine.totalSpecsDefined);
    },

    suiteStarted: (suite) => {
        log(colors.sub_heading() +
            'Current testing suite =' + 
            suite.fullName.trim() + '\n' +
            colors.neutral()
        );
    },

    specStarted: (spec) => {
        specStarted = new Date();
    },

    specDone: (spec) => {
        var lapsedTime = (new Date() - specStarted) / 1000;

        if(!spec.failedExpectations.length){
            log(colors.pass() +
                '\t' + spec.description.trim() + '\t' + 
                lapsedTime + 's'
            );
        }         
        else {
            log(colors.fail() +
                '\t' + spec.description.trim() + '\t' + 
                lapsedTime + 's'
            );
            spec.failedExpectations.forEach((expectation) => {
                log('\tFailed spec reasons' +
                     '\n\t\tReason: ' + expectation.message + 
                     '\n\t\tTrace : ' + expectation.stack.split('\n')[1].trim()
                );
            })
            
        }
        log(colors.neutral());
    },

    suiteDone: (suite) => {
        // console.log('\nResult of the suite is', result)
    },

    jasmineDone: () => {
        var totalTime = (new Date() - jasmineTestsStarted)/1000
        log('End of executing test cases @ ' + 
            colors.highlight() + 
            new Date().toLocaleString()
        );
        log('\nFinished in '+ totalTime);
        log(colors.heading());
        log('--------------------------------------');
        log('         End of tests Run             ');
        log('--------------------------------------');
        log(colors.neutral());
    }
}

// module.exports = exports = consoleReporter