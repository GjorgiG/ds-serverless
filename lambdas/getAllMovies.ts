import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({ region: process.env.REGION }));

exports.handler = async () => {
  try {
    const params = {
      TableName: process.env.TABLE_NAME,
    };
    
    const data = await client.send(new ScanCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({
        movies: data.Items || [],
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error fetching movies",
      }),
    };
  }
};
