import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import MineTitle from "../MineTitle";

const OurCompany = () => {
  return (
    <Box>
      <Container>
        <MineTitle title={"Our Company"} />
        <Grid container spacing={1}>
          <Grid item md={7} xs={12}>
          <Typography variant="h6" my={2} fontWeight={600}>
            lorem ipsum dolor sit amet, consectetur adip
          </Typography>
            <Typography component={'p'} width={'75%'}mt={1} >

            While every individual component of a CSS linear gradient is just as
            important as the next, no cake would be complete without its icing.
            Just the same, no gradient would be a proper gradient without some
            colors to transition between! These colors can be set as any type:
            named, HEX, RGB, or HSL. Because of this, there are a lot of
            different options when it comes to how your gradient can be shown.
            For example, if using RGB, you could add an alpha number for
            transparency. (Think of that like some fondant on top of the icing.
            It’s super cool, but probably more for people who know what they’re
            doing and want a little something extra on their cake.) Although the
            code can work without them, positions can also be added after each
            color for more control over how the gradient looks and where each
            color blends with the next. These positions can be set in
            percentages or pixels, depending on which is easier for you.{" "}
            </Typography>
            <Typography component={'p'} width={'75%'}mt={1} >

            <strong > While </strong> every individual component of a CSS linear gradient is just as
            important as the next, no cake would be complete without its icing.
            Just the same, no gradient would be a proper gradient without some
            colors to transition between! These colors can be set as any type:
            named, HEX, RGB, or HSL. Because of this, there are a lot of
            different options when it comes to how your gradient can be shown.
            For example, if using RGB, you could add an alpha number for
            transparency. (Think of that like some fondant on top of the icing.
            It’s super cool, but probably more for people who know what they’re
            doing and want a little something extra on their cake.) Although the
            code can work without them, positions can also be added after each
            color for more control over how the gradient looks and where each
            color blends with the next. These positions can be set in
            percentages or pixels, depending on which is easier for you.{" "}
            </Typography>
          </Grid>
          <Grid item md={5} xs={12}>
            <img
              src="https://i.pinimg.com/564x/78/4e/fd/784efd3481b5cadb17d59fd8cdf42804.jpg"
              alt="hhd"
              width={"100%"}
              style={{ borderRadius: "20px" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OurCompany;
