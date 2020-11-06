class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((acc,curTrans) => acc + curTrans.value , 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  isAllowed() {
    return this.account.balance + this.value >= 0;
  }
  commit() {
    let allow = this.isAllowed();
    if (allow) {
      this.time = new Date();
      this.account.addTransaction(this);
    }
    return allow;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -(this.amount);
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

const t1 = new Deposit(120.00, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

const t2 = new Withdrawal(50.25, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

const t3 = new Withdrawal(100.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);


console.log('Balance:', myAccount.balance);
