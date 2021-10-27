/* eslint-disable @next/next/no-img-element */
import { Button, CircularProgress } from "@material-ui/core";
import axios from "axios";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import { Photo } from "../types/photoTypes";
import style from "./PhotoList.module.css";

export default function PhotoList() {
  const [name, setName] = useState("");
  const [refresh, setRefresh] = useState(0);

  return (
    <div className={style.photoList}>
      <div className={style.inputBox}>
        <label htmlFor="name">
          Your Name:{" "}
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
          onClick={() => setRefresh((num) => ++num)}
        >
          Refresh
        </Button>
      </div>
      <List refresh={refresh} name={name} />
    </div>
  );
}

interface IProps {
  refresh: number;
  name: string;
}

function List({ refresh, name }: IProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    async function load() {
      setLoading((load) => ++load);

      try {
        const res = await axios.get<Photo[]>(`/api/photos?name=${name}`);
        setPhotos(res.data);
        setError("");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setError(err.response.data.message);
      } finally {
        setLoading((load) => --load);
      }
    }

    /* ==== Load data with fetch ==== */
    // async function load() {
    //   setLoading(load => ++load);

    //   try {
    //     const res = await fetch(`/api/photos?name=${name}`);
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //     const data = await res.json();
    //     if (!res.ok) {
    //       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    //       throw new Error(data.message);
    //     }

    //     setPhotos(data);
    //     setError("");
    //   } catch (err) {
    //     let msg = "Failed to load data.";
    //     if (err instanceof Error) msg = err.message;

    //     setError(msg);
    //   }finally{
    //     setLoading(load => --load);
    //   }
    // }

    void load();
  }, [name, refresh]);

  return (
    <div className={style.list}>
      {error && <div className={style.error}>{error}</div>}
      {!!loading && (
        <div className={style.loading}>
          <CircularProgress />
          <span>Loading...</span>
        </div>
      )}

      {!!photos.length &&
        photos.map((item) => <PhotoBox key={item.id} photo={item} />)}
    </div>
  );
}

function PhotoBox({ photo }: { photo: Photo }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = async () => {
    try {
      const res = await axios.post<Photo>("/api/favorites", {
        ...photo,
        isFavorite,
      });
      setIsFavorite(res.data.isFavorite);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  return (
    <div className={style.photoBox}>
      <div>
        <img className={style.image} src={photo.thumbnail} alt="" />
      </div>
      <div className={style.photoInfo}>
        <h5>{photo.title}</h5>
        <Button
          variant="contained"
          color={isFavorite ? "secondary" : "primary"}
          onClick={handleFavorite}
        >
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </Button>
      </div>
    </div>
  );
}
