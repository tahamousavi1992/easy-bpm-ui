<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
    <xsl:output method="xml" indent="yes"/>

  <!-- identity transform -->
  <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <!--<xsl:template match="/process/*">
    <xsl:variable name="split" select="string-length(substring-before(translate(name(), 'BCDEFGHIJKLMNOPQRSTUVWXYZ', 'AAAAAAAAAAAAAAAAAAAAAAAAA'), 'A'))" />
    <xsl:element name="{substring(name(), $split + 1)}">
      <xsl:attribute name="type">
        <xsl:value-of select="substring(name(), 1, $split)"/>
      </xsl:attribute>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:element>
  </xsl:template>-->


</xsl:stylesheet>
