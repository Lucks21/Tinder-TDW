import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
  } from "@mui/material";
  import { useState } from "react";
  import generarNombre from "./Pages/getNombre";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import NotInterestedIcon from "@mui/icons-material/NotInterested";
  import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import ExpandLessIcon from "@mui/icons-material/ExpandLess";
  import getPerrosFromAPI from "./Pages/getPerritos";
  import { useQuery, useQueryClient } from "@tanstack/react-query";
  
  export default function TinderPerros() {
  
    const { data: perroInfo, isLoading } = useQuery({
      queryKey: ["perro"],
      queryFn: () => getPerrosFromAPI("https://dog.ceo/api/breeds/image/random"),
    });
  
    const queryClient = useQueryClient();
  
  
    const [like, setLike] = useState([]);
    const [dislike, setDislike] = useState([]);
  
    const [showDescription, setShowDescription] = useState(false);
    
    const handleExpandClick = () => {
      setShowDescription(!showDescription);
    };
  
    const handleClickLike = (perroImg) => {
      const perroCandidato = {
        name: generarNombre(6),
        img: perroImg,
        descrip: "Descripcion del perro",
      };
      setLike((listaPerritos) => [perroCandidato, ...listaPerritos]);
      queryClient.invalidateQueries({ queryKey: ["perro"] });
    };
  
    const handleClickDislike = (perroImg) => {
      const perroCandidato = {
        name: generarNombre(6),
        img: perroImg,
        descrip: "Descripcion del perro",
      };
      setDislike((listaPerritos) => [perroCandidato, ...listaPerritos]);
      queryClient.invalidateQueries({ queryKey: ["perro"] });
    };
  
    const handleClickLikeCambiar = (perro) => {
      const nuevoLike = dislike.filter((perrox) => perrox.name !== perro.name);
      setDislike(nuevoLike);
      setLike((antes) => [perro, ...antes]);
    };
  
    const handleClickDislikeCambiar = (perro) => {
      const nuevoDislike = like.filter((perrox) => perrox.name !== perro.name);
      setLike(nuevoDislike);
      setDislike((antes) => [perro, ...antes]);
    };
  
    return (
      <Grid container spacing={8}>
        <GridItem title={"Perro Candidato"}>
          {!isLoading ? (
            <CardPerroCandidato
              perroImg={perroInfo.message}
              description={"Descripcion del perrito :D"}
              showDescription={showDescription}
  
              handleClickLike={() => handleClickLike(perroInfo.message)}
              handleClickDislike={() => handleClickDislike(perroInfo.message)}
              handleExpandClick={handleExpandClick}
            />
          ) : (
            <span
              style={{
                color: "#012030",
                fontFamily: "sans-serif",
                fontSize: "24px",
              }}
            >
              Cargando...
            </span>
          )}
        </GridItem>
  
        <GridItem title={"Perros con Like"}>
          {like.map((likePerro) => (
            <Card key={likePerro.name}>
              <CardMedia component="img" src={likePerro.img} />
              <CardActions>
                <IconButton onClick={() => handleClickDislikeCambiar(likePerro)}>
                  <ChangeCircleIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </GridItem>
  
        <GridItem title={"Perros con Dislike"}>
          {dislike.map((dislikePerro) => (
            <Card key={dislikePerro.name}>
              <CardMedia component="img" src={dislikePerro.img} />
              <CardActions>
                <IconButton onClick={() => handleClickLikeCambiar(dislikePerro)}>
                  <ChangeCircleIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </GridItem>
      </Grid>
    );
  }
  
  function GridItem({ title, children }) {
    return (
      <Grid item xs={12} sm={6} md={4}>
        <h3
          style={{ color: "#012030", fontFamily: "sans-serif", fontSize: "32px" }}
        >
          {title}
        </h3>
        {children}
      </Grid>
    );
  }
  
  function CardPerroCandidato({
    perroImg,
    description,
    showDescription,
    handleClickLike,
    handleClickDislike,
    handleExpandClick,
  }) {
    return (
      <Card>
        <CardMedia
          component="img"
          height="350"
          src={perroImg}
          alt="Imagen de un perro muy lindo"
        />
        <CardContent>{showDescription && <p>{description}</p>}</CardContent>
        <CardActions>
          <IconButton onClick={handleClickLike}>
            <FavoriteIcon />
          </IconButton>
          <IconButton onClick={handleClickDislike}>
            <NotInterestedIcon />
          </IconButton>
          <IconButton onClick={handleExpandClick}>
            {showDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </CardActions>
      </Card>
    );
  }
