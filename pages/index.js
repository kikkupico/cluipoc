//useSWR allows the use of SWR inside function components
import useSWR from 'swr';

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR('/api/data', fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  return (
    <div>
      <h1>Changelog</h1>
      <ol>
        {data.map((e, i) => (
          <li key={i}>
            <a href={e.pr_link}>PR</a>
            <div>{e.changelog}</div>
            <ul>
              {e.tags.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
