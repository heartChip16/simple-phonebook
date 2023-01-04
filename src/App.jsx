import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border: 'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}


function PhoneBookForm({ addEntryToPhoneBook }) {
  var firstName;
  var lastName;
  var phone;

  const [user, setUser] = useState({});

  // useEffect(()=>{
  function handleSubmit(e) {
    e.preventDefault();
    firstName = e.target.userFirstname.value;
    lastName = e.target.userLastname.value;
    phone = e.target.userPhone.value;

    // console.log("firstname: " ,firstName);
    let user = {
      "firstName": firstName,
      "lastName": lastName,
      "phone": phone
    };
    // console.log("user within phonebook", user);
    addEntryToPhoneBook(user);
  }
  // },[])
  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname'
        type='text'
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userLastname'
        name='userLastname'
        type='text'
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone'
        name='userPhone'
        type='text'
      />
      <br />
      <input
        style={style.form.submitBtn}
        className='submitButton'
        type='submit'
        value='Add User'
      />
    </form>
  )


}

function InformationTable(props) {
  const users = props.users;
  // console.log("users in InformationTable: ", users);
  return (
    <table style={style.table} className='informationTable'>
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>

      </thead>
      <tbody>
        {users?.map(({ firstName, lastName, phone }) => (
          <tr key={phone}>
            <td style={style.tableCell}>{firstName}</td>
            <td style={style.tableCell}>{lastName}</td>
            <td style={style.tableCell}>{phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Application(props) {
  const initialUser = {
    "firstName": "Coder",
    "lastName": "Byte",
    "phone": "8885559999"
  };
  const [users, setUsers] = useState([initialUser]);


  const addEntryToPhoneBook = (user) => {
    setUsers([...users, user].sort((a, b) => {
      return a.lastName > b.lastName ? 1 : -1;
    }));
  };

  // console.log("users: ", users);


  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable users={users} />
    </section>
  );
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);