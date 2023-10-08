import React from 'react';
import { createStyles, Title, Text, Button, Container, Group, Center } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  root: {
    marginTop: 'auto',
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 140,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export function ComingSoon() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>In progress</div>
      <Title className={classes.title}>Page under development.</Title>
      <Group position="center">
        <Link href="/">
          <Button variant="subtle" size="md">
            Take me back to home page
          </Button>
        </Link>
      </Group>
    </Container>
  );
}
