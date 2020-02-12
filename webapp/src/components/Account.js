import React from 'react'
function Account({account, ETH}) {
    return (
        <div style={{marginTop:"1em",marginLeft:"2em"}}>
        <h2>Active Account</h2>
        <p><b>adress:</b> {account.address} </p>
        <p><b>Balance:</b> {(account.balance / ETH).toFixed(3) + " ETH"} </p>
      </div>
    )
}

export default Account
