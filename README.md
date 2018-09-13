# Fast-food-Fast
| Service         | Master      | Develop  |
| -------------   |-------------|----------|
| Travis CI status| [![Build Status](https://travis-ci.com/katunold/Fast-food-Fast.svg?branch=master)](https://travis-ci.com/katunold/Fast-food-Fast)|[![Build Status](https://travis-ci.com/katunold/Fast-food-Fast.svg?branch=develope)](https://travis-ci.com/katunold/Fast-food-Fast)|
| Coveralls| [![Coverage Status](https://coveralls.io/repos/github/katunold/Fast-food-Fast/badge.svg?branch=master)](https://coveralls.io/github/katunold/Fast-food-Fast?branch=master)|[![Coverage Status](https://coveralls.io/repos/github/katunold/Fast-food-Fast/badge.svg?branch=develope)](https://coveralls.io/github/katunold/Fast-food-Fast?branch=develope)|

[![Maintainability](https://api.codeclimate.com/v1/badges/5be9128126237c01f541/maintainability)](https://codeclimate.com/github/katunold/Fast-food-Fast/maintainability)

## About
Fast-Food-Fast is a food delivery service app for a restaurant.
This project is part of the [Andela Fellowship](https://andela.com/) Bootcamp 12 Challenge.
## Motivation
This is driven by the need to improve service delivery, using technology has proven to be more effective in time saving.
This project is mean't to help users to easily make orders of food online and Admins to manage the system.
### Useful Links to my gh-page
| gh-Pages | Heroku | Pivotal Tracker |
|----------|--------|-----------------|
|[gh-pages Link](https://katunold.github.io/Fast-food-Fast/)|[Heroku](https://fast-food-arnold.herokuapp.com/api/v1/orders/)|[Pivotaltracker Link](https://www.pivotaltracker.com/n/projects/2196796)                 |

***Features***
 * User can fetch all orders.
 * User can fetch a specific order.
 * User can post an order. 
 * User can can update an order.
 
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development
and testing purposes.
### Prerequisites
What you need to install the software and get started.

```bash
- git : to update and clone the repository
- python3: The base language used to develop the api
- pip: a python package used to install project requirements
```
### Installation
```bash
Type:
```
The UI folder houses the user interface. To access the user interface, open the index.html.

The api folder contains the system backend services.
- To install the requirements, run:
- [Python](https://www.python.org/) A general purpose programming language
- [Pip](https://pypi.org/project/pip/) A tool for installing python packages
- [Virtualenv](https://virtualenv.pypa.io/en/stable/)  A tool to create isolated Python environments
#### Development setup
- Create a virtual environment and activate it
    ```bash
     virtualenv venv
     source /venv/bin/activate
    ```
- Install dependencies 
    ```bash
    pip3 install -r requirements.txt
    ```
- Run the application
    ```bash
    cd Fast-food-Fast
    python run.py
    ```
- Now you can access the system api Endpoints:

| End Point                                           | Verb |Use                                       |
| ----------------------------------------------------|------|------------------------------------------|
|`/api/v1/orders/`                                    |GET   |Gets a list of all orders              |
|`/api/v1/orders/<int:order_id>/`                     |GET   |Gets a specific specific order  |
|`/api/v1/orders/`                                    |POST  |Posting an order                        |
|`/api/v1/orders/<int:order_id>/`                     |PUT   |Updates the status of an order      |

## Running the tests

- To run the tests, run the following commands

```bash
pytest --cov=api
```

## Built With

* [Flask](http://flask.pocoo.org/docs/1.0/) - The web framework used
* [Python](https://www.python.org/) - Framework language
* HTML
* CSS

## Authors

* **Katumba Arnold** - *Initial work* - [katunold](https://github.com/katunold)

## Acknowledgments

* Andela Software Development Community
