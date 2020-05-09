APIURL = "http://localhost:8080"
courseCatalogueAPI = "/course-ids-with-logs-and-structs"
videoCatalogueAPI = "/video-ids-by-course"
videoCurveAPI = "/users-watchings"

var courseSelector = new Vue({
    el: '#select-course',
    data () {
      return {
        options: null
      }
    },
    methods: {
        newCourseSelected: function(event) { newCourseSelected(event) }
    },
    mounted() {
        axios
            .get(APIURL+courseCatalogueAPI)
            .then(response => {
                this.options = response.data
            });
    }
})

var videoSelector = new Vue({
    el: "#select-video",
    data () {
        return {
          options: null
        }
    },
    methods: {
        newVideoSelected: function(event) {
            axios
                .get(APIURL+videoCurveAPI+"?video_id="+encodeURIComponent(event.target.value))
                .then(response => {
                    videoWatchingPlot = document.getElementById('video-watching-plot');
                    curves = [removeNegativeValues(response.data)]
                    Plotly.newPlot(videoWatchingPlot, curves, { margin: { t: 0 } } );
                })
        }
    }
})

function newCourseSelected(event) {
    axios
    .get(APIURL+videoCatalogueAPI+"?course="+encodeURIComponent(event.target.value))
    .then(response => {
        videoSelector.options = response.data
    })
}

// Function that removes negative points from plot
// It's needed because some logs are not 100% accurate and there are more pause events than play events
function removeNegativeValues(data) {
    x = data.x;
    y = data.y;

    for (let x_index = 0; x_index < x.length; x_index++) {
        if (y[x_index] < 0) {
            data.x.splice(x_index, 1);
            data.y.splice(x_index, 1);
            x_index--
        }
    }

    return data
}

videoWatchingPlot = document.getElementById('video-watching-plot');
Plotly.newPlot(videoWatchingPlot, [{
    x: [1, 2, 5, 4, 3],
    y: [1, 2, 4, 8, 16] 
  }, {
    x: [1, 4, 5, 2, 3],
    y: [1, 2, 4, 8, 16] 
  }
  ], { margin: { t: 0 } } );
  