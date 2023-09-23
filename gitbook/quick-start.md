---
description: Quick start in understanding the API
---

# 📍 Quick Start

{% hint style="info" %}
**Good to know:** There are a few libraries that already exist for interacting with the API in various programming languages available on GitHub
{% endhint %}

## Getting authenticated

Before logging in, you'll need to get your Basic Authentication Token. This can be sniffed from http requests on your device in the "authorization" header, or generated yourself with this guide, which also provides working [examples](reference/basic-token-generation.md#basic-token-examples) of how'd you generate them in various programming languages.

{% content-ref url="reference/basic-token-generation.md" %}
[basic-token-generation.md](reference/basic-token-generation.md)
{% endcontent-ref %}

Don't forget to prime your basic token!&#x20;

## Logging In

A lot of requests will work with just a Basic Token, but&#x20;

{% content-ref url="reference/api-reference/oauth2.md" %}
[oauth2.md](reference/api-reference/oauth2.md)
{% endcontent-ref %}

{% tabs %}
{% tab title="Curl" %}
```bash
curl -XGET
    -H 'authorization: Basic YourBasicToken'
    -H 'ifunny-project-id: iFunny'
    -H 'content-type: application/x-www-form-urlencoded'
    -H 'accept: application/json'
    -d 'grant_type=password'
    -d 'username=your@email.com'
    -d 'password=YourPassword123!'
    'https://api.ifunny.mobi/v4/oauth2/token'
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

headers = {
    'Authorization': 'Basic YourBasicToken',
    'ifunny-project-id': 'iFunny',
    'content-type': 'application/x-www-form-urlencoded',
    'accept': 'application/json',
}

data = 'grant_type=password&username=your@email.com&password=YourPassword123!'

response = requests.get('https://api.ifunny.mobi/v4/oauth2/token', headers=headers, data=data)
```
{% endtab %}

{% tab title="NodeJS" %}
```javascript
import axios from 'axios';

const response = await axios.get('https://api.ifunny.mobi/v4/oauth2/token', {
  headers: {
    'Authorization': 'Basic YourBasicToken',
    'ifunny-project-id': 'iFunny',
    'content-type': 'application/x-www-form-urlencoded',
    'accept': 'application/json'
  },
  data: 'grant_type=password&username=your@email.com&password=YourPassword123!'
});
```
{% endtab %}

{% tab title="Rust" %}
```rust
extern crate reqwest;
use reqwest::header;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut headers = header::HeaderMap::new();
    headers.insert("Authorization", "Basic YourBasicToken".parse().unwrap());
    headers.insert("ifunny-project-id", "iFunny".parse().unwrap());
    headers.insert("content-type", "application/x-www-form-urlencoded".parse().unwrap());
    headers.insert("accept", "application/json".parse().unwrap());

    let client = reqwest::blocking::Client::builder()
        .redirect(reqwest::redirect::Policy::none())
        .build()
        .unwrap();
    let res = client.get("https://api.ifunny.mobi/v4/oauth2/token")
        .headers(headers)
        .body("grant_type=password&username=your@email.com&password=YourPassword123!")
        .send()?
        .text()?;
    println!("{}", res);

    Ok(())
}
```
{% endtab %}

{% tab title="GoLang" %}
```go
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
)

func main() {
	client := &http.Client{}
	var data = strings.NewReader(`grant_type=password&username=your@email.com&password=YourPassword123!`)
	req, err := http.NewRequest("GET", "https://api.ifunny.mobi/v4/oauth2/token", data)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("Authorization", "Basic YourBasicToken")
	req.Header.Set("ifunny-project-id", "iFunny")
	req.Header.Set("content-type", "application/x-www-form-urlencoded")
	req.Header.Set("accept", "application/json")
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	bodyText, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s\n", bodyText)
}
```
{% endtab %}
{% endtabs %}

### Getting Features



{% tabs %}
{% tab title="curl" %}
```bash
curl -XGET
    -H "authorization: Basic YourBasicToken"
    -H "ifunny-project-id: iFunny"
    -H "accept: application/json"
    "https://api.ifunny.mobi/v4/feeds/featured"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

headers = {
    'Authorization': 'Basic YourBasicToken',
    'ifunny-project-id': 'iFunny',
}

response = requests.get('https://api.ifunny.mobi/v4/features', headers=headers)
```
{% endtab %}

{% tab title="NodeJS" %}
```javascript
import axios from 'axios';

const response = await axios.get('https://api.ifunny.mobi/v4/features', {
  headers: {
    'Authorization': 'Basic YourBasicToken',
    'ifunny-project-id': 'iFunny'
  }
});
```
{% endtab %}

{% tab title="Rust" %}
```rust
extern crate reqwest;
use reqwest::header;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut headers = header::HeaderMap::new();
    headers.insert("Authorization", "Basic YourBasicToken".parse().unwrap());
    headers.insert("ifunny-project-id", "iFunny".parse().unwrap());

    let client = reqwest::blocking::Client::builder()
        .redirect(reqwest::redirect::Policy::none())
        .build()
        .unwrap();
    let res = client.get("https://api.ifunny.mobi/v4/features")
        .headers(headers)
        .send()?
        .text()?;
    println!("{}", res);

    Ok(())
}
```
{% endtab %}

{% tab title="GoLang" %}
```go
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

func main() {
	client := &http.Client{}
	req, err := http.NewRequest("GET", "https://api.ifunny.mobi/v4/features", nil)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("Authorization", "Basic YourBasicToken")
	req.Header.Set("ifunny-project-id", "iFunny")
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	bodyText, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s\n", bodyText)
}
```
{% endtab %}
{% endtabs %}

### Getting your account information

{% tabs %}
{% tab title="curl" %}
```bash
curl -XGET
    -H 'authorization: Bearer YourBearerToken'
    -H 'ifunny-project-id: iFunny'
    'https://api.ifunny.mobi/v4/account'
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

headers = {
    'authorization': 'Bearer YourBearerToken',
    'ifunny-project-id': 'iFunny',
}

response = requests.get('https://api.ifunny.mobi/v4/account', headers=headers)
```
{% endtab %}

{% tab title="NodeJS" %}
```javascript
import axios from 'axios';

const response = await axios.get('https://api.ifunny.mobi/v4/account', {
  headers: {
    'authorization': 'Bearer YourBearerToken',
    'ifunny-project-id': 'iFunny'
  }
});
```
{% endtab %}
{% endtabs %}
