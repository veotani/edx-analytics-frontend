var app = new Vue({
  el: '#select-course',
  data () {
    return {
      options: null
    }
  },
  mounted () {
    axios
      .get('http://localhost:8080/course-ids-with-logs-and-structs')
      .then(response => {
        this.options = response.data
      });
    // axios
    //   .get('http://localhost:8080/course-routes', {params: {courseID: "a"}})
    //   .then(response => {
    //     console.log(response.data)
    //   });
  },
  methods: {
    newCourseSelected(event) {
      axios
        .get('http://localhost:8080/course-routes?course='+encodeURIComponent(event.target.value))
        .then(response => {
          console.log(response.data.length)
          TESTER = document.getElementById('tester');
          Plotly.newPlot( TESTER, response.data, {margin: {t: 0}});
        });
      }
  }
})


TESTER = document.getElementById('tester');
Plotly.newPlot( TESTER, [{
  x: [1, 2, 5, 4, 3],
  y: [1, 2, 4, 8, 16] 
}, {
  x: [1, 4, 5, 2, 3],
  y: [1, 2, 4, 8, 16] 
}
], {
  margin: { t: 0 } } );
