import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Button,
    Divider,
    Grid,
    Header,
    Image,
    Segment,
} from 'semantic-ui-react';
import { Container as SemanticContainer } from 'semantic-ui-react';
import Container from '@material-ui/core/Container';

const HomeBody = ({ mobile }) => {
    return (
        <Container maxWidth="lg" className="home-page-body">
            <Segment vertical>
                <SemanticContainer text>
                    <Grid container stackable verticalAlign="middle">
                        <Grid.Row>
                            {!mobile && (
                                <Grid.Column floated="left" width={4}>
                                    <Image
                                        src="https://react.semantic-ui.com/images/wireframe/image.png"
                                        size="small"
                                    />
                                </Grid.Column>
                            )}

                            <Grid.Column width={mobile ? 16 : 12}>
                                <Header as="h2">Compete with Friends</Header>
                                <p>
                                    Compete in monthly battles to see who can
                                    budget the best.
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                        <Grid.Row>
                            <Grid.Column width={mobile ? 16 : 12}>
                                <Header as="h2">
                                    Take Control of your Spendings
                                </Header>
                                <p>
                                    Keep track of everything you buy with our
                                    one stop shop website and app.
                                </p>
                            </Grid.Column>
                            {!mobile && (
                                <Grid.Column floated="right" width={4}>
                                    <Image
                                        src="https://react.semantic-ui.com/images/wireframe/image.png"
                                        size="small"
                                    />
                                </Grid.Column>
                            )}
                        </Grid.Row>
                        <Divider />
                        <Grid.Row>
                            {!mobile && (
                                <Grid.Column floated="right" width={4}>
                                    <Image
                                        src="https://react.semantic-ui.com/images/wireframe/image.png"
                                        size="small"
                                    />
                                </Grid.Column>
                            )}
                            <Grid.Column width={mobile ? 16 : 12}>
                                <Header as="h2">
                                    Visualize and Stay Organized
                                </Header>
                                <p>
                                    View automatically generated visualizations
                                    to catch any trends in your spendings.
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                        <Grid.Row>
                            <Grid.Column width={mobile ? 16 : 12}>
                                <Header as="h2">Get Started with Ease</Header>
                                <p>
                                    Use your existing Facebook or Gmail Login
                                    and start saving today!
                                </p>
                            </Grid.Column>
                            {!mobile && (
                                <Grid.Column floated="left" width={4}>
                                    <Image
                                        src="https://react.semantic-ui.com/images/wireframe/image.png"
                                        size="small"
                                    />
                                </Grid.Column>
                            )}
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={mobile ? 16 : 12}>
                                <Link to="/getstarted">
                                    <Button>Get Started!</Button>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </SemanticContainer>
            </Segment>
        </Container>
    );
};

HomeBody.propTypes = {
    mobile: PropTypes.bool,
};

export default HomeBody;
