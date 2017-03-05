# SASS-Template-Factory

[![Build Status](https://travis-ci.org/TaylorAckley/sass-template-factory.svg?branch=master)](https://travis-ci.org/TaylorAckley/sass-template-factory)

### Overview 

A simple utility that helps you create css files dynamically.    You provide an object of styling values and a template to interpolate them with.   After the values have been interpolated, the utility will compile the SASS to CSS.   Also works if the template is plain CSS.   This utility is useful if you need to create css files on the fly in response to branding changes or letting users style a multi-tenet site via form.

#### Components

SASS-Template-Factory has two components.
- Compiler class.  Makes up the main functionality of the library.    You provide the template and values and out comes a css file.
- Base64 helper utlities.   Used to help you turn your template into a Base64 string

## Use Cases

"I want to take dyanmic values from a form or database, such as colors, and create a css file from them dynamically."
"I want to take an object of values and interpolate them with a SASS or CSS template and compile it to css."
"I want to either provide the template as a base64 string, or grab a template from S3"
"I want either a base64 string returned as a promise, or have the completed file sent to S3"
"I want a simple utility to create a base64 string fro another string or file"

## Installation

- Run `npm install sass-template-factory --save`
- Require it in your js file to expose the Compiler class.   `Compiler = require('sass-template-factory');`
- the AWS-SDK is used to power the S3 functionality.   if you plan on using S3, you will need to expose the standard `process.env` variables.
-- `process.env.AWS_ACCESS_KEY_ID`
-- `process.env.AWS_SECRET_ACCESS_KEY`
--`process.env._AWS_BUCKET` (optional)

## Usage

