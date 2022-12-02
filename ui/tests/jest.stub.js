// reference
// taken from https://stackoverflow.com/a/57944238
if (typeof window.URL.createObjectURL === 'undefined') {
    window.URL.createObjectURL = () => {
      // Do nothing
      // Mock this function for mapbox-gl to work
    };
  }
  // end of reference