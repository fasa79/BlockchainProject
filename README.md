# Bank Negara Launderer Detector


## Installation

1. Install Truffle globally.
    ```javascript
    npm install -g truffle
    ```

## Run the Development

2. Run the development console.
    ```javascript
    truffle develop
    ```

3. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

## Perform Unit Testing

4. Test the smart contract with both good behaviour and potential laundering transactions.
    ```javascript
    test
    ```

## Run the DApp

5. Install static server globally.
    ```javascript
    npm install -g static-server
    ```

6. Run the DApp
    ```javascript
    static-server
    ```
## FAQ

1. Do I need to install Metamask extension?

    **Answer** : Yes, as Metamask will be used for all the transactions and transaction fee (gas price) in the web. Make sure your account is connected to Metamask.

2. Do I need to run Ganache?

    **Answer** : You should run and setup Ganache before running `$ truffle migrate` . Thus, it's recommended to run Ganache so you can monitor the accounts used for transaction. 


3. What is the port used to run the Smart Contract (SC)?

    **Answer** : The smart contract should be deployed at http://127.0.0.1:9545 . Make sure the the Truffle, Ganache and Metamask are connected to the same port.

4. How do I connect account to Metamask?

    **Answer** : Open your Ganache, pick any account you wish and get the private key string. Go to Metamask extension and click import account. Paste the private key string. Your account and balance should appear.

    
## Declaimers

**NOTE**: This github repository is for both Blockchain and Application Part 1 and Part 2.

**AUTHOR**: FADHLUDDIN BIN SAHLAN (1817445) & FAEEZ ZIMAM BIN FEIZAL (1819541)
