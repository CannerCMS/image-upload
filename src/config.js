import firebase from 'firebase';

module.exports = {
  generateConfig: function(serviceConfig) {
    switch (serviceConfig.name) {
      case 'firebase':
        return this.firebaseConfig(serviceConfig);
      case 'imgur':
      default:
        return this.imgurConfig();
    }
  },
  imgurConfig: function() {
    if (process.env.NODE_ENV === 'production') {
      return {
        name: 'image',
        accept: 'image/*',
        action: 'https://imgur-apiv3.p.mashape.com/3/image',
        headers: {
          'X-Mashape-Key': 'bF1fkS9EKrmshtCbRspDUxPL5yhCp1rzz8ejsnqLqwI2KQC3s9',
          'Authorization': 'Client-ID cd7b1ab0aa39732',
          'X-Requested-With': null
        }
      };
    }

    return {
      name: 'image',
      accept: 'image/*',
      action: 'https://api.imgur.com/3/image',
      headers: {
        'Authorization': 'Client-ID a214c4836559c77',
        'X-Requested-With': null
      }
    };
  },
  firebaseConfig: function(serviceConfig) {
    return {
      customRequest: function(obj) {
        // 在這個component裡不處理 firebase 的登入，
        // 登入應該要在 canner-web 的 qaformContainer 完成
        // 如果沒有登入 無法上傳
        const {file, onProgress, onSuccess, onError} = obj;
        const images = firebase.storage().ref(serviceConfig.dir)
                        .child(serviceConfig.filename || file.name);
        const uploadTask = images.put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          function(snapshot) {
            const percent = snapshot.bytesTransferred /
                            snapshot.totalBytes * 100;
            onProgress({percent});
          }, function() {
            onError();
          }, function() {
            onSuccess({data: {link: uploadTask.snapshot.downloadURL}});
          }
        );
      }
    };
  },
  background: [
    "confectionary.png",
    "geometry2.png",
    "school.png",
    "congruent_pentagon.png",
    "giftly.png",
    "upfeathers.png",
    "pink.png",
    "concrete_seamless.png",
    "old_map.png"
  ],
  gallery: {
    bnb: {
      name: "民宿",
      size: 7,
      max: "1800",
      min: "600",
      type: "jpg"
    },
    coffee: {
      name: "咖啡廳",
      size: 11,
      max: "1800",
      min: "600",
      type: "jpg"
    }
  },
  icon: {
    size: 43
  }
};
