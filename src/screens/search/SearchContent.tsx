import React from "react";
import { Button } from "react-native-paper";
import { Container } from "../../ui-kit/Container";
import { useSearchContent } from "./useSearchContent";

export const SearchContent = () => {
  const { goToHawkTsibouki } = useSearchContent();
  return (
    <Container>
      <Button mode="contained" onPress={goToHawkTsibouki}>
        Go to hawk
      </Button>
    </Container>
  );
};
