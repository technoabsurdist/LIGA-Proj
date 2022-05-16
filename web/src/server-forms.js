// script to interact with sheets with form info as API 
const baseUrl = 'https://api.sheety.co/a4604d1afe4644a3ac7435ff76d09663/ligaRequestForm (responses)/formResponses1'

// Functionality:  

// 1) retrieve rows in your datasheet
export const retreiveRows = () => {
    let url = baseUrl; 
    fetch(url)
      .then((response) => response.json())
      .then(json => {
        // Do something with the data
        console.log(json.formResponses1S);
      });
}


// 2) add row to your data sheet
export const addRow = (name, logo, descr, reprName, reprMail) => {
    let url = baseUrl; 
    let body = {
      formResponses1: {
        'Timestamp': 'NaN', 
        'RSO name': name, 
        'RSO Logo': logo, 
        'RSO description (what does the organization do?)': descr, 
        'RSO Representative for LIGA name': reprName, 
        'RSO Representative for LIGA email': reprMail, 
      }
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then(json => {
        // Do something with object
        console.log(json.formResponses1);
      });
}


// 3) edit a row to your datasheet
export const editRow = (name, logo, descr, reprName, reprMail) => {
    let url = baseUrl + '/2';  // endpoint /2
    let body = {
        formResponses1: {
          'Timestamp': 'NaN', 
          'RSO name': name, 
          'RSO Logo': logo, 
          'RSO description (what does the organization do?)': descr, 
          'RSO Representative for LIGA name': reprName, 
          'RSO Representative for LIGA email': reprMail,  
        }
    }

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then(json => {
      // Do something with object
      console.log(json.formResponses1);
    });
}


// 4) delete a row in your sheet
export const deleteRow = () => {
    let url = baseUrl + '/2'; // endpoint /2

    fetch(url, {
        method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        console.log('Object deleted');
      });
}

