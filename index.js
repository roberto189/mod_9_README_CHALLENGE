const inquirer = require('inquirer');
const fs = require('fs');
const licenses = new Map([
    ['Apache 2.0 License', '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'], 
    ['Boost Software License 1.0', '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)'], 
    ['BSD 3-Clause License', '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)'], 
    ['BSD 2-Clause License', '[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)'], 
    ['CC0', '[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)'], 
    ['Attribution 4.0 International', '[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)'], 
    ['Attribution-ShareAlike 4.0 International', '[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)'], 
    ['Attribution-NonCommercial 4.0 International', '[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)'], 
    ['Attribution-NoDerivates 4.0 International', '[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC_BY--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)'], 
    ['Attribution-NonCommmercial-ShareAlike 4.0 International', '[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC_BY--NC--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)'], 
    ['Eclipse Public License 1.0', '[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)'], 
    ['GNU GPL v3', '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'], 
    ['GNU GPL v2', '[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)'], 
    ['GNU AGPL v3', '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)'], 
    ['GNU LGPL v3', '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)'], 
    ['GNU FDL v1.3', '[![License: FDL 1.3](https://img.shields.io/badge/License-FDL_v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)'], 
    ['The Hippocratic License 2.1', '[![License: Hippocratic 2.1](https://img.shields.io/badge/License-Hippocratic_2.1-lightgrey.svg)](https://firstdonoharm.dev)'], 
    ['The Hippocratic License 3.0', '[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)'], 
    ['IBM Public License Version 1.0', '[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)'], 
    ['ISC License (ISC)', '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)'], 
    ['The MIT License', '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'], 
    ['Mozilla Public License 2.0', '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'], 
    ['Attribution License (BY)', '[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)'], 
    ['Open Database License (ODbL)', '[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)'], 
    ['Public Domain Dedication and License (PDDL)', '[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)'], 
    ['The Perl License', '[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)'], 
    ['The Artistic License 2.0', '[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)'], 
    ['SIL Open Font License 1.1', '[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL_1.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)'], 
    ['The Unlicense', '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'], 
    ['The Do What the Fuck You Want to Public License', '[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)'], 
    ['The zlib/libpng License', '[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)']
]);
const questions = [
    {
        type: "input",
        message: "What is the title of your project?",
        name: "Title"
    },
    {
        type: "input",
        message: "What is your project about?",
        name: "Description",
    
    },
    {
        type: "input",
        message: "What command would a user use to install this program?",
        name: "Installation",
        default: "npm i",
      
    },
    {
        type: "input",
        message: "How would a user use this program?",
        name: "Usage"
    },
    {
        type: "list",
        message: "Please choose a license",
        name: "License",
        choices: Array.from(licenses.keys()),
      
    },
    {
        type: "input",
        message: "Is there anyone you want to give a shout out to for helping you?",
        name: "ShoutOuts",
    
    },
    {
        type: "input",
        message: "Please explain how users may test your application",
        name: "Test",
        default: "npm run test",
      
    },
    {
        type: "input",
        message: "Please list instructions for those who wish to contact you",
        name: "Questions",
      
    },
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "Username",
      
    },
    {
        type: "input",
        message: "What is your Email address?",
        name: "Email",
      
    },
 
];

inquirer.prompt(questions)
.then ((answers) => {
    generateREADME('./Demo/README.md', answers); 
});

function generateREADME(filename, answers) {
    var readme = "# " + answers.Title + "\n";
    readme += licenses.get(answers.License) + "\n";
    readme += "- [Description](#description)\n";
    readme += "- [Installation](#installation)\n";
    readme += "- [Usage](#usage)\n";
    readme += "- [License](#license)\n";
    readme += "- [ShoutOuts](#shoutouts)\n";
    readme += "- [Test](#test)\n";
    readme += "- [Questions](#questions)\n\n";
    readme += "## Description \n";
    readme += answers.Description + "\n\n";
    readme += "## Installation \n";
    readme += answers.Installation + "\n\n";
    readme += "## Usage \n";
    readme += answers.Usage + "\n\n";
    readme += "## License \n";
    readme += answers.License + "\n\n";
    readme += "## ShoutOuts \n";
    readme += answers.ShoutOuts + "\n\n";
    readme += "## Test \n";
    readme += answers.test + "\n\n";
    readme += "## Questions \n";
    readme += answers.Questions + "\n\n";
    readme += "https://github.com/" + answers.Username + "\n\n";
    readme += answers.Email + "\n\n";

    fs.writeFile(filename, readme, (err) =>
        err ? console.log(err) : console.log('Successfully created README.md file')
    );
}