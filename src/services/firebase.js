// import firebase from 'react-native-firebase';
import { auth, firestore, storage } from '../components/Firebase';
import RNFetchBlob from 'rn-fetch-blob'
// const storage = firebase.storage()

//--
export const uploadImage = (uri, mime = 'application/octet-stream') => {
  const Blob = RNFetchBlob.polyfill.Blob
  const fs = RNFetchBlob.fs;
  const tempWindowXMLHttpRequest = window.XMLHttpRequest;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob
  return new Promise((resolve, reject) => {
    console.log("Bhavesh new" + uri)
    //const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri//'https://avatars0.githubusercontent.com/u/12028011?v=3&s=200'
    const uploadUri = uri.replace('file://', '');
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images').child(`${sessionId}`)
    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(uri, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        window.XMLHttpRequest = tempWindowXMLHttpRequest;
        console.log("Upload Result ------ ", imageRef.getDownloadURL());
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        console.log("Upload Result 11 ------ ", url);
        resolve(url)
      })
      .catch((error) => {
        console.log("Upload Error ------ ", error);
        window.XMLHttpRequest = tempWindowXMLHttpRequest;
        reject(error)
      })
  })
}

export const uploadMultipleImage = (uris, mime = 'application/octet-stream') => {

  //const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri//'https://avatars0.githubusercontent.com/u/12028011?v=3&s=200'
  const Blob = RNFetchBlob.polyfill.Blob
  const fs = RNFetchBlob.fs;
  const tempWindowXMLHttpRequest = window.XMLHttpRequest;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob
    const urls = uris.map((item) => {
      // const uri = item.path;
      return new Promise((resolve, reject) => {
        console.log("Bhavesh new" + item.path)
        //const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri//'https://avatars0.githubusercontent.com/u/12028011?v=3&s=200'
        const uploadUri = item.path.replace('file://', '');
        const sessionId = new Date().getTime()
        let uploadBlob = null
        const imageRef = storage.ref('images').child(`${sessionId}`)
        fs.readFile(uploadUri, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
            uploadBlob = blob
            // return imageRef.put(item.path, { contentType: mime })
            return imageRef.putFile(item.path, { contentType: mime })
          })
          .then(() => {
            uploadBlob.close()
            window.XMLHttpRequest = tempWindowXMLHttpRequest;
            return imageRef.getDownloadURL()
          })
          .then((url) => {
            resolve(url)
          })
          .catch((error) => {
            window.XMLHttpRequest = tempWindowXMLHttpRequest;
            reject(error)
          })
      })
    })
  
    return Promise.all(urls)
      .then((data) => {
        return data
      })
  
}

export const uploadVideo = (uri, mime = 'application/octet-stream') => {
  console.log("Upload video file uri=", uri)
  // return storage.ref('videos/movie.mp4').putFile(uri).then(() => {
  //   console.log("Video upload Success!");
  //   return Promise.resolve();
  // }).catch(() => {
  //   console.log("Video upload Failed!")
  //   return Promise.reject();
  // })

  return new Promise((resolve, reject) => {
    const uploadUri = uri.replace('file://', '');
    const sessionId = new Date().getTime()
    
    videoRef = storage.ref('videos').child(`${sessionId}.mp4`);
    videoRef.putFile(uri).then(() => {
      console.log("Video upload Success!");
      resolve(videoRef.getDownloadURL());
    }).catch(() => {
      console.log("Video upload Failed!")
      reject();
    });
    
  });
}

export const newUserStory = (date, fileType, story, text, story_creater, typer, textColor) => {
  let currentUserId = auth.currentUser.uid;
  let userAvatar = '';
  let userName = '';
  let storyRef = firestore.collection('story_users').doc(currentUserId);
  let timeStamp = new Date().getTime();
  firestore.collection('newUsers').doc(currentUserId).get().then((doc) => {
    if (doc.exists) {
      let userData = doc.data();
      userAvatar = userData.profile;
      userName = userData.name;
    }
    storyRef.get().then((doc) => {
      if (!doc.exists) {
        storyRef.set({
          lastModified: timeStamp,
        }).then(() => {
          storyRef.collection('items').add({
            date,
            fileType,
            story,
            text,
            typer,
            textColor
          }).then((doc) => {
            console.log("New User story created1! = ");
          }).catch((error) => {
            console.log("New User story failed1! = ", error);
          });
        });
      } else {
        storyRef.update({
          lastModified: timeStamp,
        }).then(() => {
          storyRef.collection('items').add({
            date,
            fileType,
            story,
            text,
            typer,
            textColor
          }).then((doc) => {
            console.log("New User story created2! = ");
          }).catch((error) => {
            console.log("New User story failed2! = ", error);
          });
        });
      }
    })
  })
}

export const newStory = (date, fileType, story, textdata, story_creater, event_Information, typer, textColor) => {

  // firestore.collection('story_events').add({
  //   date,
  //   fileType,
  //   story,
  //   textdata,
  //   story_creater,
  //   event_Information,
  //   typer,
  //   textColor
  // }).then((data) => {
  //   console.log("Event Stroy is created! = ", data);
  // }).catch((error) => {
  //   console.log("Event story is not created! =", error);
  // })

  // console.log("Event Information ========== ", event_Information.eventId);

  let storyRef = firestore.collection('story_events').doc(event_Information.eventId);
  let timeStamp = new Date().getTime();
  firestore.collection('events').doc(event_Information.eventId).get().then((doc) => {
    if (doc.exists) {
      let eventData = doc.data();
      // userAvatar = userData.profile;
      // userName = userData.name;
    }
    storyRef.get().then((doc) => {
      if (!doc.exists) {
        storyRef.set({
          lastModified: timeStamp,
        }).then(() => {
          storyRef.collection('items').add({
            date,
            fileType,
            story,
            textdata,
            story_creater,
            typer,
            textColor
          }).then((doc) => {
            console.log("New Event Story created1! = ");
          }).catch((error) => {
            console.log("New Event Story failed1! = ", error);
          });
        });
      } else {
        storyRef.update({
          lastModified: timeStamp,
        }).then(() => {
          storyRef.collection('items').add({
            date,
            fileType,
            story,
            textdata,
            story_creater,
            typer,
            textColor
          }).then((doc) => {
            console.log("New Event Story created2! = ");
          }).catch((error) => {
            console.log("New Event Story failed2! = ", error);
          });
        });
      }
    })
  })
}

export const editEvent = (eventDetail, key) => {
  // firebase.database().ref('Events/').child(`${key}`).update(
  //   eventDetail
  // ).then((data) => {
  //   //success callback
  //   console.log('data ', data)
  // }).catch((error) => {
  //   //error callback
  //   console.log('error ', error)
  // })
  firestore.collection('events').doc(key).update(eventDetail).then((data) => {
    console.log("Event data update success! =", data);
  }).catch((error) => {
    console.log("Event data update failed! = ", error);
  })
}

export const deleteEvent = (key) => {
  // firebase.database().ref('Events/').child(`${key}`).remove();
  firestore.collection('events').doc(key).delete();
}

export const addEvent = (eventData) => {
  return new Promise((resolve, reject) => {
    firestore.collection('events').add(eventData).then((value) => {
      console.log("Added Doc ID = ", value.id);
      // firestore.collection('events').doc(value.id).collection('searchData').add(eventData.searchData).then((result) => {
        resolve(value)
      // }).catch((searhErr) => {
      //   reject(searhErr)
      // });
    }).catch((error) => {
      reject(error);
    });
  })
  
}

export const addStory = (fileType, story, textData, creatorId, typer, textColor, creatorStoryShared, sharedEventList) => {
  let document = {
    timestamp: Date.now(),
    fileType: fileType,
    story: story,
    textData: textData,
    textColor: textColor,
    creatorId: creatorId,
    typer: typer,
    creatorStoryShared: creatorStoryShared,
    sharedEventList: sharedEventList
  }
  return new Promise((resolve, reject) => {
    firestore.collection('stories').add(document).then((value) => {
      console.log("New Story Created ==== ", value);
      resolve(value);
    }).catch(error => {
      console.log("New Story Create Error ==== ", error);
      reject(error);
    })
  })
}

export const addUserStory = async (fileType, story, textData, creatorId, typer, textColor) => {
  let document = {
    timestamp: Date.now(),
    fileType: fileType,
    story: story,
    textData: textData,
    textColor: textColor,
    creatorId: creatorId,
    typer: typer,
  }

  firestore.collection('users').doc(creatorId).collection('stories').add(document);
}

export const fetchOnlineVideo = (uri) => {
  const filename = uri.substring(uri.indexOf('%2F'), uri.indexOf('?'));
  console.log("LocalFileName = ", filename);
}
