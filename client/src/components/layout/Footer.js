import React from "react";
import { Container, Grid, Header, List, Segment } from "semantic-ui-react";
import Typography from "@material-ui/core/Typography";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="start">
      {"Copyright © "}
      Budget Battle
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = () => {
  return (
    <Segment vertical className="footer">
      <Container>
        <Grid divided stackable>
          <Grid.Row style={{ width: "300px" }}>
            <Grid.Column width={4}>
              <Header as="h4" content="Contact Me" />
              <List link>
                <List.Item as="a" href="https://github.com/justinyeung">
                  Github
                </List.Item>
                <List.Item
                  as="a"
                  href="https://www.linkedin.com/in/justin-yeung-ba6925192/"
                >
                  LinkedIn
                </List.Item>
                <List.Item as="a" href="https://www.facebook.com/justinyeungg">
                  Facebook
                </List.Item>
                <List.Item as="a" href="https://twitter.com/JustinYeungg">
                  Twitter
                </List.Item>
                <List.Item
                  as="a"
                  href="https://www.instagram.com/justinyeungg/"
                >
                  Instagram
                </List.Item>
                <List.Item
                  as="a"
                  href="https://www.snapchat.com/add/justinyeungg"
                >
                  Snapchat
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header as="h4" content="Navigation" />
              <List link>
                <List.Item as="a" href="/login">
                  Login/Signup
                </List.Item>
                <List.Item as="a" href="/">
                  Home
                </List.Item>
                <List.Item as="a" href="/getstarted">
                  Getting Started
                </List.Item>
                <List.Item as="a" href="/dashboard">
                  Dashboard
                </List.Item>
                <List.Item as="a" href="/friends">
                  Friends
                </List.Item>
                <List.Item as="a" href="/purchases">
                  Purchases
                </List.Item>
                <List.Item as="a" href="/battles">
                  Battles
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h4" content="Development" />
              <List link>
                <List.Item as="p">
                  This website was developed by Justin Yeung using Node.js,
                  Express.js, React.js, MongoDB with the use of Material UI and
                  Semantic UI.
                </List.Item>
                <List.Item
                  as="a"
                  href="https://github.com/justinyeung/BudgetBattle"
                >
                  View the code on Github
                </List.Item>
                <List.Item>
                  <Copyright />
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;