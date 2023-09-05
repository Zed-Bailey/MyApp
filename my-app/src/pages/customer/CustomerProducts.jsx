import { SimpleGrid } from "@mantine/core";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

const items = [
  "item 1",
  "item 2",
  "item 3",
  "item 4",
  "item 5",
  "item 6",
  "item 7",
  "item 8",
  "item 9",
];

export default function CustomerProducts() {
  return (
    <SimpleGrid cols={4} spacing={"lg"}>
    
      
        {items.map((item, index) =>{ return(
          <ItemCard itemName={item} />
        )})}
      
    </SimpleGrid>
    
  );
}

function ItemCard({itemName}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{itemName}</Text>
        <Badge color="pink" variant="light">
          On Sale
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        Should anything go here?
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        View  product
      </Button>
    </Card>
  );
}
