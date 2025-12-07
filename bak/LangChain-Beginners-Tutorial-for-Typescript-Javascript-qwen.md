# LangChain Beginner's Tutorial for TypeScript/JavaScript

## Introduction

All right, this is Val and this is a brief tutorial from chat with data YouTube channel on how to use LangChain to build complex simple AI applications for JavaScript or TypeScript. This is a JavaScript/TypeScript beginner's tutorial for LangChain. You kind of think of LangChain as a framework that makes it easier to build these large language model applications.

## What is LangChain?

To understand what LangChain is, we have to understand the problems around building applications. If you've ever tried to build one of these AI apps that we see popping all over the place where you know someone plugs into the open AI API and you've got apps that allow you to write, create images and do all these wonderful things, but particularly when it comes to text, there are a lot of challenges.

### Problem 1: Scalability

One of the main challenges is scalability. If you jump into the playground, we can see that it's cool we can effectively use the API. So you could come here and say "write a tagline for my business" and click submit, and that's going to pop out something right now.

When we jump into looking at the max length of basically how much can we send to the large language model per request, we're looking around 4,000 tokens. That's more or less three quarters of a word, right? So you're looking about 3,800 words to squeeze in per request, and that's a combination of your prompt (your prompt is the instruction you'll give to a large language model) and the response have to combine together to more or less 3,800 words.

If you don't meet that, then you need to start to do things like chunking and splitting your text. For example, if you wanted to summarize a 10,000 word PDF or 10,000 word book, or you wanted to extract insights, you've run into issues where you need to split the text and then how much you split the text by and then how do you make sure you don't lose context and so on and so forth.

If you've ever tried to build or you can imagine that very frustrating and very difficult to deal with.

### Problem 2: Relevant/Misleading Information

You are probably going to get relevant or misleading information without proper context. When it comes to custom data - data that's relevant to your business, data that's relevant to your work or something specific you're looking for that's real time on the web - these large language models are not going to necessarily give you the best result.

For example, this is me earlier trying to look at this particular method or of putting together a chat bot using LangChain, and this is the response that ChatGPT gave me: "LangChain is a natural language processing model and LangChain is a blockchain" which is not true. Now it's talking about smart contracts and all these things that have nothing to do with LangChain.

If you've ever tried to use ChatGPT for specific things of your work or custom data or specific knowledge, you've probably been frustrated to see that it's not really tailored towards you. It's just very general, it's very good at general things and that's what they were made for so that we can quote unquote fine-tune it for our specific use.

### Problem 3: Complex Prompt Workflows

Third pain point is around crafting complex prompt workflows. You can imagine this is very basic, but imagine if you had a situation where you wanted to describe something a bit more where you provide in some sort of an identity. Let's imagine you're a business owner based in New York, you have 20 years experience building businesses, what you want to expand businesses in retail, what you want to expand to fashion and so on.

You can imagine like a prompt where you give identity and then after you give an identity you probably want to give instructions of what not to do or what not to say and then you probably want to give examples and you want to give context. So there's a lot that you can feed the model ahead of time to get a more precise result.

The problem is, as I said earlier, it doesn't scale because you have it's difficult to do all of that precisely within the same chunk, but the other issue is it's just very complex to manage because imagine all these different things are inputs from users. You could have this being a variable input, you could have this being a variable input, then you have to deal with testing and logging and managing your tokens and your costs and all these things that are problems as well.

### Problem 4: Pre-processing and Formatting

Then there's pre-processing and formatting on structured data. The large model is going to best understand text. The stores which I'm going to talk about in a second where we put the text in number format so that we can retrieve also prefers this kind of clear text format. So if we're coming from the world of PDFs, images we need to pre-process. Even with text we need to chunk it up, we need to make it in a way where it's easier and it's efficient to work with our data.

### Problem 5: Cost of APIs

The final thing is the cost of APIs. As demand rises, the cost of the API increases as well because of inefficiencies and all these other areas.

## How LangChain Solves These Problems

Now we understand what the problems are, let's see how LangChain can help to solve. As I said, it's building AI powered by custom data made easy. That's the most simple way I can explain it.

We're looking at use cases:

- Question and answering documents
- Custom documents chatbot for your data
- Personal assistance to use external tools

For example, you can have be able to chain together instructions that you know effectively a bot is able to go and search real-time data on Google and that may be use OpenAI to generate some sort of instructions or response and then take that response and plug into Slack or maybe book your calendar for you.

There are so many use cases. They got summarization of large documents. So you can kind of think of LangChain as a library or framework to coordinate all these different use cases and all these different complexities that we spoke about earlier that were problems.

## Components of LangChain

These are the components of LangChain:

- Prompts: Your prompts or your prompt templates - the instructions to the large language model as to what to do
- Large language model: The large language model itself
- Memory: The ability to memorize previous conversations
- Indexes: Where you store the data
- Document loaders: How you convert the docs to text
- Agents: Where integration to external tools comes in
- Chains: Basically chaining together all these different components (where the name LangChain comes from)

## Example: Creating a Chain for a Chatbot

Let's jump into their docs. This is the LangChain docs for JavaScript and TypeScript which we're going to focus on in this tutorial. What you can see up here is a search bar. If I jumped in here and I said "how do I create a chain for a chatbot for my documents", you can use LangChain to create one of them is conversation chain which is pre-built and it gives you the code and it gives you verified sources to check it out.

These are actual verified sources from within this website itself. What we're capable of doing now is basically you turn your docs, your website, your newsletter, your application, your database into this format that we can have a chat or conversation with. This is basically what the power is and you can see how this is way more precise than something like a general chatbot.

## Code Examples

### Simple Chain

Let's jump into the code. We're going to start off first of all with a simple chain. A simple chain is effectively where we have an input from a user or just a general input, a query just like we would with ChatGPT and the large language model like OpenAI will take that query, process the query, return a response.

Here's the code base. We installed the library LangChain which you can do by just simply doing `npm install langchain`. I'll put all the instructions in the GitHub repo after this tutorial, but effectively all we're doing is just like you typically would - you would initiate the model, put in the temperature or whatever the parameters you want to use and then you get the response. This is just the syntax using OpenAI.

### Prompt Templates

Now let's move over to another example where effectively we have a user and instead of just simply saying "what is the capital city in France" where I'm the one who's going to hard code this time, we're going to make France variable.

So it's going to be variable to what the user inputs and this is not any different from a typical AI application. If you built one, you're always looking for a way to have your prompts which is your instructions, but then you have pockets of those instructions that you want the user to be able to input which customizes and makes it more tailored towards them.

The user is going to give an input here and be able to change the country. Then we effectively create this chain with the large language model who then outputs. It's basically identical to the basic call except the user we have these variable this variable here we can call this a prompt template and we can call this the chain.

LangChain has these prompt templates that are effectively just some more customizable format of what we would have to type out manually. So we wouldn't normally have to in this case imagine it being more complex, but this is the equivalent of saying "variable text and then you would have your what is the capital city of country" where country is effectively the variable dynamic variable that is going to be passed in from a user's inputs that can come from the front end or it could be a request to the back end however you want to do it.

### Few Shot Prompts

What's a few shot prompt? A few shots is just basically examples you provide to the large language model to help it generate a better response. For example, let's say you wanted to you know you wanted to give context on different countries and capitals so that you want the model to have a pattern to use in this response. So you're still going to ask it the same question then you provide these few shots or these examples to help it have a better response.

In this case, we're providing these examples to the United States Washington DC, Canada Ottawa, and then we have a formatted template which is effectively what the template is that we're going to pass over and then we have the example prompt. Again you can see these are variables that are going to change because they're going to come from these examples here and this is the template that we created.

This creates an example that we can use. Finally we create an object so this is a few shot template object that we create instance from that LangChain provides. These are you can read through this later but basically you can provide prefix or what text you want to go before, what text you want to go after, and so effectively you will end up with something like "what is the capital city of the country below".

In this case we are providing these things called few shot examples - they're just examples to help the model. But he knows anyway he wants to seize the pattern of country capital, country capital. You provided France as a country and now if I just press submit it should say Paris.

This is how you use few shot prompts by basically providing your question or your prompt and then the few shots, but in the case of JavaScript and LangChain you can use these few shot prompt templates which effectively take your examples which you provided earlier, the example prompt, the prefix, the suffix and help you to effectively scale this because this can get very very tedious.

## Agents

### What is an Agent?

Now let's start with agents because that's a bit more exciting and also a bit more requires a bit more thinking about. An agent you can kind of think of as a personal assistant that uses the large language model to help you take actions and it can help you either observe or use external tools.

Let's start from here so we have the user and the user says "how many countries are there in Africa to the power of three?" I know this is a crazy example but just stick with me here.

So they send this question to OpenAI for example the model and the model basically speaks to this agent or this bot and the bot thinks to itself "well I need to find each country in Africa and add them together" - that's the first thought that this bot has.

Now it then goes and uses something like a serp API which is a real-time API to access Google search results, performs a search action to find all these African countries based on live results and then maybe finds an article that gives you know credible article that concludes the observation that there are 54 countries in Africa.

Then the bot says "well okay now I need to calculate the total number of countries in Africa to the third power" so that's what he's thinking and then it uses another tool to do calculations - there's times they can calculate action. It observes this number, it thinks itself "now I know the final answer" and this is the final output that is this number is the number of African countries to power three.

There's different components here: there's user, there's a model, there's the agent, there's thinking, there's tools, there's searching, there's actions, there's observations and then there's the final output. But in essence all it is effectively is a chain of a sequence of interacting with the large language model for instructions and then interacting with third-party tools to get whatever outcome you're looking for.

### Agent Code Example

I'm not going to run this one here particularly because you can just get a serp API free API key that you can test this with, but effectively again we initiate the large language model, we initiate the tools so we got the calculator and serp API. LangChain provides tools that you can use - there are many many more. You've got Bing, dad jokes, IFTTT where you can connect to third-party tools and so on and then you've got agents.

This agent is going to take tools, the model and this framework you can change this and read up on it. It's just a framework that kind of goes through this kind of pattern of thinking that we described where it has a thought and then a follow-up observation and so on and so forth.

Then you have the input "what are the total number of countries in Africa raised to the power of three", executes and calls and this is kind of what the final result looks like. There's a lot of use cases that we can think about here besides search - interacting with your calendars and going to do maths and then taking that data and interact with other tools. The use cases are immense when it comes to agents, LangChain and external tools.

## Memory

### What is Memory?

Let's jump into memory. What's memory? Memory is just basically given the chatbot the ability to remember previous conversations. If you remember one of the big challenges is when you're interacting with these chatbots or you try and make your own chatbot they don't have extensive memory and sometimes no memory.

So imagine someone you ask a question and then you ask a follow-up question but it doesn't have context, the response is not going to be great. So what we want is to give the ability to take previous conversations into context for future conversations but to do it in a pain-free way. LangChain gives us the ability to do that.

Here we are effectively where we're saying we initiate this buffer memory class, we create the new object called memory, a new conversation chain again. LangChain has these components in different libraries and this library is free. Then you call with the input "hello I'm John" so this is the user base he's saying "hi I'm John", you get a response and so on and so forth.

So effectively what's going to happen is I'm going to say "my name is John", it's going to say "hi I'm going to ask you what my name is" and it's going to respond "hi John I'm an AI nice to meet you, can I ask you something what do you do for a living?" and here I go "what's my name" and the chatbot says "your name is John" so you remember that my name is John.

This gives the chain or agent the ability to remember information from previous conversations. So you got the input from the user, previous chat context, and then that is packaged into an instruction or a prompt in a structured way that LangChain helps you to do behind the scenes. You pass that over to the model and you get a final answer.

What's pretty cool about LangChain is all of this is abstracted and you don't have to worry about figuring all this stuff out yourself and how to structure the problems or what prompts you use and so much complexity going on under the scenes especially in terms of structure and has been handled for you from the library.

## Indexes and Embeddings

### What are Embeddings?

Before we jump into indexes it's important to understand the concept of embeddings. I'm going to do another video on embeddings and how to work with effectively the language of the computer or the language of the large language models and when it comes to interacting with documents because that's really the goal behind this channel is how do we build applications that help to interact with data.

One of the things is that these models are very much focused on numbers. They don't necessarily understand text per se in the sense that they usually under the hood convert to numbers that they can use. This is particularly important when it comes to embeddings when it comes to Q&A with document chatbots because effectively what you're doing is you are converting your the query or the user query into text form into your number of vectors like this that you pass over and store in a place called a vector store where the vector store already contains a bunch of these for your document.

So it's actually matching these numbers against the existing numbers to then decide which ones are similar. It gives a similarity score using things like cosine similarity which I'm not going to get into right now.

But in a nutshell, embeddings is just converting text into numbers in a way that large language models can easily talk to and we can easily do analysis to compare find similarities and the keyword analysis and so on and so forth.

### Indexes

You can think of an index as a collection of these embeddings, these vector stores and the process of getting to that point. Here we can imagine we have your PDF that we load the docs into text, then we take that text we may split it into chunks because it's too big as we spoke about but what's cool is LangChain handles this for us.

Create these embeddings using an embedding function. OpenAI provides an embedding function that we can use to effectively convert all this text here into these numbers that we can then store and we can then retrieve later down the line.

### Embeddings Code Example

Here we have embeddings and like I said you can grab OpenAI and here we are creating a function where we are embedding the query "hello world" and we get a response and we also embedding documents. Document from LangChain's point of view is simply just text and metadata combined together. What I mean by metadata is just in just description or something useful to know about that particular text they can use to retrieve later on.

So you can see that we've created these numbers as I said. These few words have created 1000 each vector has one thousand 536 dimensions. So that's what we're dealing with here and so you can see all these numbers so you can imagine if I did a search or query what would happen is if you had a large document that you had already embedded we would embed the query so the query could be "hello world" and then we would compare the vectors the numbers to the numbers already in storage and whatever is in storage that is closest to "hello world" is what is sent back.

### Document Loaders

Here we have a document loader called recursive text splitter and like I said these are just useful super useful tools that you would have had to figure out the logic yourself previously but LangChain provides facility for that.

In this case, we split this into different chunks. We defined we wanted to be 10 characters per chunk and each overlap between chunk would be one character. This is what this thing called the recursive character text splitter can do for you using LangChain.

### Vector Stores

What happened here was I already ran through this function. You can run through it yourself but what I ran through this function to store this text here - it says State of the Union text speech. So this is how it will typically look like in real time: you would have your text already ready to go and then you would have the vector store.

So we would load the text, load the model. Now we're going to use Pinecone. Pinecone is a vector store so remember the diagram where we store the embeddings so we're using Pinecone. There are others like Chroma and Weaviate and there's all kinds of other ones but for this example we're using Pinecone.

So you need to go on Pinecone - it's free you can sign up and create your own vector base. I initiate that, I load the file, then I split as I showed you previously - I'm splitting into chunks of 1000 characters, then I create a document object. This is the index I created on Pinecone which I'm getting, I embed these documents running through these functions.

Speaking of document loaders you also have a lot of choices here so you can literally scrape websites, you can Hacker News, IMDb, documents so there's loads of documents and every day or every week you know you have people effectively making pull requests to add more.

### Basic Chain Example

We've gone through basic chain. This is just a basic chain - I think we went through very similar to the previous example with the prompts where we're just chaining the template, the prompt template with the large language model. You can see you should be familiar with this now.

Then we create the chain so the large language model chain which is a combination of the model and the prompt we asked "what country is it France" and he says "Paris".

### Conversation Chain

We can also have conversations as well using the conversation chain. Again we initiate OpenAI, LangChain provides a conversation chain which also includes prompts that you don't have to worry about yourself and then we have the chain call. You see "hi I'm Jim hi Jim it's nice to meet you my name is blah blah blah blah blah how can I help you today" and you have another response that comes through when I say "what's my name" so you said your name is Jim. So similar to the memory case I'm just showing you how it turns into a thing called a chain.

### Summarization

Summarization is obviously very useful. So in this case it's just a simple case of using loading again. LangChain provides utilities for all these things but here we're just doing short text - it could be longer, it could be a document, whatever it is you want to do. You load in this case I'm using analyze document chain because it's a small piece of text but if I had chunks I would use a different chain. Again the docs are very very useful for this and you call and then you get a response.

### Question Answering

We got question answering situation where you have a document which could be much much more than this but "Rachel went to Harvard time when Stanford". This is effectively what it looks like. As I said it contains page content and optional metadata.

The chain call takes Docs and also the question and it passes that to the model as well. So we asked the question "where did Rachel go to college" and we get the response "Rachel went to Harvard" which the text did say "Rachel went to Harvard".

### Q&A with Documents

The final example is where it gets very interesting. Before we jump in I just want to say that you know there are some useful utilities here. What I'm trying to do here is just kind of I guess break down the magic behind it - it's not too much but it's just the basics of what's going on.

You embed in a query you effectively embedding using this function called embed query similarity vector search. This is where we want to look at what it's currently in the vector store and compared to our query and the closer the numbers are in terms of similarity scores then that's what we want to get back.

We have Pinecone we're initiating as a storage we have the cross checking that the particular index that we're indexing in the store that has our data. This index has been pre-loaded with data from that speech that I showed you earlier that was in the large text and this is the query so the query is "how many new jobs the economy create".

In fact our economy created over 6.5 million new jobs just last year. You can see this is a large body of text there's a lot going on.

We're going to call Vector DB chain again don't follow this syntax too closely because this is almost like a custom function that I made that I showed you previously but always effectively doing is taking the query, it's taking the index which you saw earlier so it gives you the operations a typical CRUD operations to create, read, update, delete the namespace so what's the name space where the vector is stored and how many results do you want to return that are similar.

We pass all of that we run through a vector search function and we do some other stuff nothing too crazy but here we just focused on first principles so effectively we've run that chain which includes the large language model query the index the namespace all the things you can imagine would be necessary including prompts provided by LangChain to structure and to try and find the relevant information.

So we got the answer "over 6.5 million jobs". What's pretty cool is now let's run it back let's see what's going on. So what's going on you can see we have vectors here we're splitting the text then we've got the results of the similarity search which was in that pre inside this function here. You can see this is each vector has an ID score metadata which contains the text. You can see that this snippet of text which was a chunk that we split initially is the most similar in terms of vectors to this question here that's why I was the first one to show up because these are the vectors of this query and these vectors which are 1536 dimensions where compared to the vectors in the database and if found that ID 11 was the most similar.

So this is the text and then ID 17 was the second most similar and so on and so forth. So that's how the vector similarities work. We keep going down and you can see just more stuff going on but eventually we land with the final response. We pick the top scoring one we passed that over to you can see this is the template provided by LangChain that I did not have to write "use the following piece of context if you don't know the answer just say you do not know" you pass that as context then we ask the question which was here and then we leave a gap for a helpful answer.

## Conclusion

That's how it works in a nutshell. It's not too crazy but it's very exciting very interesting. Effectively everything that you would have had to abstract for yourself figure out the problems the structures how do I extract data how do I effectively integrate different tools with the large language model how do I scale my application how do I make it more cost effective - LangChain is really working on that.

I hope this video was useful for you as a TypeScript/JavaScript developer because there's not much resources out there for us to build this stuff but I believe as the ecosystem keeps growing it's going to get better. If you have any questions just hit me up in the comments and that'll probably also give me good ideas for the next video.
