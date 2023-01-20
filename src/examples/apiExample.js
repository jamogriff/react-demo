import { exampleApi } from "../../api/ExampleCRUDApi";

function fetch1040FormDetails() {
  try {
    const response = TaxApi.fetch1040FormDetails;

    if (response.status_code === 200) {
      // do foo;
    } else {
      // do bar;
    }
  } catch (error) {
    // do baz;
  }
}
