# SASS-Template-Factory

[![Build Status](https://travis-ci.org/TaylorAckley/sass-template-factory.svg?branch=master)](https://travis-ci.org/TaylorAckley/sass-template-factory)

### Overview

A simple utility that helps you create css files dynamically.    You provide an object of styling values and a template to interpolate them with.   After the values have been interpolated, the utility will compile the SASS to CSS.   Also works if the template is plain CSS.   This utility is useful if you need to create css files on the fly in response to branding changes or letting users style a multi-tenet site via form.

#### Components

SASS-Template-Factory has two components.
- Compiler class.  Makes up the main functionality of the library.    You provide the template and values and out comes a css file.
- Base64 helper utlities.   Used to help you turn your template into a Base64 string

## Use Cases

"I want to take dynamic values from a form or database, such as colors, and create a css file from them dynamically."
"I want to take an object of values and interpolate them with a SASS or CSS template and compile it to css."
"I want to either provide the template as a base64 string, or grab a template from S3"
"I want either a base64 string returned as a promise, or have the completed file sent to S3"
"I want a simple utility to create a base64 string fro another string or file"

## Installation

- Run `npm install sass-template-factory --save`
- Require it in your js file to expose the Compiler class.   `Compiler = require('sass-template-factory');`
- the AWS-SDK is used to power the S3 functionality.   if you plan on using S3, you will need to expose the standard `process.env` variables.
  - `process.env.AWS_ACCESS_KEY_ID`
  - `process.env.AWS_SECRET_ACCESS_KEY`
  - `process.env.AWS_BUCKET` (optional)

## Usage

The library is simple to use and the end-product can be acheived in three simple stemps.

Interpolation works by providing a template with properties designated to be replaced, and a object of options to replace them with.


### Step 1. Create Your Template

The template is a standard scss (sass) or css file.  Properties to be interpolated should be denoted using ES6 String Literal syntax, `${myVariable}`.

**Example Template:**

```scss
// example.scss

    $color1: ${color1};  //will be replaced by the variable color1 in the options property.

   p {
     color: $color1;
     }

   .my-div {
     background-color: ${color2};
   }
```

Once you have your template file, you have two options for providing it to the compiler.

1) place the file on S3.
2) Turn the file into a Base64 string.  Utlities are provided to help with this.

```javascript
'use strict';
let base64= require('sass-template-factory').base64;

// create a base64 string from a file
let _tpl =  base64.base64FromFile('./my-scss.scss');

let _scss = `.header { fonts-size: ${fontSize};  }`

// or create it from a string
let _strTpl = base64.base64FromString(_scss);
```

### Step 2: Create an Instance of the Compiler class and pass in options.

Once you have added SASS-Template-Factory to your JS file, you need to construct a new instance of the `Compiler` class.   The constructor takes an object of options.

```javascript
'use strict';
let Compiler = require('sass-template-factory');
let options = {
    tpl: _tpl, // Not needed if you plan to grab the template from S3
    src: { // src is not needed if you are passing in the tpl property with a base64 string.
        key: 'my-key',
        bucket: 'my-bucket' // or process.env.AWS_BUCKET
    },
    opts: {
        color1: '#000'
        color2: ''#
        fff '
    }
}
```

### Step 3: Create an instance of the Compiler class and run Compile() with the options.

```javascript
let c = new Compiler(options); //construct a new instance of the Compiler

c.compile() //run the compiler.
    .then((res) => {
        fs.writeFile('./tests/result.json', JSON.stringify(res), 'utf-8');
    })
    .catch((err) => console.log(err));
```

And that's it!


### S3 Usage

You can also either grab and/or deliver to S3.  It doesn't need to beth both.  You can grab from S3 using just `src` then do something with the result in the Promise, or more likely, pull the template from your code and deliver to S3.

The S3 functionality is powered by the `aws-sdk` npm package and expects

  - `process.env.AWS_ACCESS_KEY_ID`
  - `process.env.AWS_SECRET_ACCESS_KEY`
  - `process.env.AWS_BUCKET` (optional)

```javascript

        let options = {
            src: {
                key: 'test.scss',
                bucket: 'my-bucket'
            },
            opts: {
                color1: "#000",
                color2: "#FFF"
            },
            out: {
                key: 'compiled.css',
                bucket: 'my-bucket'
            }
let c = new Compiler(options); //construct a new instance of the Compiler

c.compile() //run the compiler.
    .then((res) => {
        console.log('Done!');
    })
    .catch((err) => console.log(err));
```

Don't overthink it!   Refer to the unit tests if you need help!