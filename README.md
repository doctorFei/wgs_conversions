# wgs_conversions #
A Utils of the World Geodetic System (WGS) conversion functions for converting to/from LLA, ENU, and ECEF.

## Available Services ##
### ECEFtoLLA ###
Converts from ECEF coordinates (in meters) to Latitude, Longitude, Altitude (in degrees).

### LLAtoECEF ###
Converts from Latitude, Longitude, Altitude (in degrees) to ECEF coordinates (in meters).

### LLAtoENU ###
Converts from Latitude, Longitude, Altitude (in degrees) to a local level frame of the East, North, Up convention (in meters).

Note: This requires a reference LLA position to serve as the origin of the local ENU frame. 

### ENUtoLLA ###
Converts from a local East, North, Up frame (in meters) to Latitude, Longitude, Altitude (in degrees).

Note: This requires a reference LLA position to serve as the origin of the local ENU frame. 

### ECEFtoENU ###
Converts from ECEF coordinates (in meters) to East, North, Up (in meters).

Note: This requires a reference LLA position to serve as the origin of the local ENU frame. 

### ENUtoECEF ###
Converts from East, North, Up (in meters) to ECEF (in meters).

Note: This requires a reference LLA position to serve as the origin of the local ENU frame. 