import React from "react";
import { View, Text } from "react-native";
import CText from "../../custom/Text"; // مطمئن شوید که این کامپوننت درست تعریف شده است.

export const RenderHTML = (html) => {
  const decodeHTML = (str) => {
    return str
      .replace(/&nbsp;/g, " ")
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"');
  };

  const regexTag = /<([a-zA-Z0-9]+)([^>]*)>(.*?)<\/\1>|<([a-zA-Z0-9]+)([^>]*)\/?>/gs;

  const parseAttributes = (attributes) => {
    const attrs = {};
    attributes.replace(/(\w+)=["'](.*?)["']/g, (_, key, value) => {
      attrs[key] = value;
      return "";
    });
    return attrs;
  };

  const createJSX = (tag, attributes = "", content = "") => {
    const parsedAttrs = parseAttributes(attributes);
    const children = Array.from(content.matchAll(regexTag)).map(
      ([_, childTag, childAttributes = "", childContent = ""]) =>
        createJSX(childTag, childAttributes, childContent)
    );

    switch (tag) {
      case "p":
        return (
          <CText key={Math.random()} style={{ marginBottom: 10 }}>
            {children.length > 0 ? children : decodeHTML(content)}
          </CText>
        );
      case "strong":
        return (
          <CText key={Math.random()} style={{ fontWeight: "bold" }}>
            {decodeHTML(content)}
          </CText>
        );
      default:
        return (
          <CText key={Math.random()}>{
            children.length > 0 ? children : decodeHTML(content)
          }</CText>
        );
    }
  };

  return (
    <View>
      {Array.from(html.matchAll(regexTag)).map(([_, tag, attributes = "", content = ""]) =>
        createJSX(tag, attributes, content)
      )}
    </View>
  );
};
