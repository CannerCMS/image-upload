module.exports = {
  imgurEndPoint: function() {
    if (process.env.NODE_ENV === 'production') {
      return {
        url: 'https://imgur-apiv3.p.mashape.com/3/image',
        header: {
          'X-Mashape-Key': 'bF1fkS9EKrmshtCbRspDUxPL5yhCp1rzz8ejsnqLqwI2KQC3s9',
          'Authorization': 'Client-ID cd7b1ab0aa39732',
          'X-Requested-With': null
        }
      };
    }

    return {
      url: 'https://api.imgur.com/3/image',
      header: {
        'Authorization': 'Client-ID a214c4836559c77',
        'X-Requested-With': null
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
