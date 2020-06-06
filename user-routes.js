APIURL = "http://localhost:8080"
courseCatalogueAPI = "/course-ids-with-logs-and-structs"
userRoutesAPI = "/course-routes"

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

function newCourseSelected(event) {
    axios
    .get(APIURL+userRoutesAPI+"?course="+encodeURIComponent(event.target.value))
    .then(response => {
        userRoutesPlot = document.getElementById('user-routes-plot');
        curves = response.data
        Plotly.newPlot(userRoutesPlot, curves, { margin: { t: 0 } } );
    })
}

videoWatchingPlot = document.getElementById('user-routes-plot');
Plotly.newPlot(videoWatchingPlot, [{
    x: [1, 2, 5, 4, 3],
    y: [1, 2, 4, 8, 16] 
  }, {
    x: [1, 4, 5, 2, 3],
    y: [1, 2, 4, 8, 16] 
  }
  ], { margin: { t: 0 } } );
  