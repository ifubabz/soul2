import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Container,
} from "@material-ui/core"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { red } from "@material-ui/core/colors"
import clsx from "clsx"

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
  },
  card: {
    maxWidth: 600,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

const EggCard = ({ egg }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {egg.name.length > 0 ? egg.name.substr(0, 1) : ""}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={egg.title}
          subheader={"D - " + egg.dueDate + " days"}
        />
        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        /> */}
        <CardContent>
          {egg.contents.map((content, index) => {
            return (
              <Typography
                variant="body2"
                key={index}
                color="textSecondary"
                component="p"
              >
                {content}
              </Typography>
            )
          })}
        </CardContent>
        <CardActions disableSpacing>
          <Typography variant="body2" color="textSecondary" component="p">
            {egg.period + " / " + egg.createDate}
          </Typography>
          {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>SubContents with checkbox</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  )
}

export default EggCard
