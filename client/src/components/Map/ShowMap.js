import React, { useCallback, useEffect, useState } from "react";
import L from "leaflet";
import useSuperCluster from "use-supercluster";
import iconImage from "../../assets/icon.svg";
import { Marker, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
const icons = {};

const fetchIcon = (count, size) => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="cluster-maker">
      ${count}
    </div>`,
    });
  }
  return icons[count];
};

const icon = L.icon({
  iconUrl: iconImage,
  iconSize: [38, 38],
});

const ShowMap = ({ setSelectProject, selectProject }) => {
  const data = useSelector((state) => state.project.projects);
  const maxZoom = 22;
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(12);
  const map = useMap();

  function updateMap() {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }

  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  const points = data.map((post) => ({
    type: "Feature",
    properties: {
      cluster: false,
      postId: post._id,
      category: post.category[0].title,
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(post.address[0].lon),
        parseFloat(post.address[0].lat),
      ],
    },
  }));

  const { clusters, supercluster } = useSuperCluster({
    points: points,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 75, maxZoom: 17 },
  });
  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;
        if (isCluster) {
          return (
            <Marker
              key={cluster.id}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                10 + (pointCount / points.length) * 40
              )}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    maxZoom
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                },
              }}
            />
          );
        }
        return (
          <Marker
            key={cluster.properties.postId}
            position={[latitude, longitude]}
            icon={icon}
            eventHandlers={{
              click: () => {
                if (
                  selectProject[0] !== latitude &&
                  selectProject[1] !== longitude
                ) {
                  setSelectProject([latitude, longitude]);
                }
                map.setView([latitude, longitude], maxZoom, {
                  animate: true,
                });
              },
            }}
          />
        );
      })}
    </>
  );
};

export default ShowMap;
