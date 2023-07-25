export const degToRad = (deg) =>{
    return deg * (Math.PI / 180);
  }

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371000; // Earth's radius in meters
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    console.log("Distance:" ,distance)
    return distance;
  }

 

  
    // return distance <= maxDistance;
  